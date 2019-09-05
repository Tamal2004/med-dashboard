import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { history } from 'libs/history';
import { reset } from 'redux-form';

//Local
import { SET_AUTH_USER_INFO, LOGOUT } from 'actionTypes';
import { showNotification } from '../notification';
import { removeTester } from '../testers';
import { createUser, deleteUser } from '../users';
import config from '../../aws-exports';
import { composeNewAccount } from 'libs';
import { sendMail } from 'services';

const {
    REACT_APP_COGNITO_USER_POOL_ID,
    REACT_APP_SES_ACCESS_KEY_ID,
    REACT_APP_SES_SECRET_ACCESS_KEY
} = process.env;

/********
 * INIT *
 ********/

AWS.config.update({
    accessKeyId: REACT_APP_SES_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_SES_SECRET_ACCESS_KEY,
    region: config.aws_appsync_region
});

const COGNITO_CLIENT = new AWS.CognitoIdentityServiceProvider({
    region: config.aws_appsync_region
});

const TEMP_PASSWORD = () =>
    Math.random()
        .toString(36)
        .substring(4) +
    Math.random()
        .toString(36)
        .substring(6)
        .toUpperCase();

/***********
 * API CALL *
 ************/
const getUser = () => {
    return Auth.currentAuthenticatedUser({
        bypassCache: true // If set to true, this call will send a request to Cognito to get the latest user data
    })
        .then(({ attributes }) => ({
            attributes
        }))
        .catch(err => err);
};

const changePassword = ({ oldPassword, newPassword }) => {
    return Auth.currentAuthenticatedUser().then(user =>
        Auth.changePassword(user, oldPassword, newPassword)
    );
};

/**********
 * ACTIONS *
 ***********/

export const testerSignUp = ({ id, email, firstName, surname }) => {
    const PASS = TEMP_PASSWORD();

    return async dispatch => {
        return Auth.signUp({
            username: email,
            password: PASS,
            attributes: {
                email,
                'custom:firstName': firstName,
                'custom:surname': surname,
                'custom:testerId': id
            }
        })
            .then(res => {
                sendMail(
                    composeNewAccount({ firstName, email, password: PASS })
                );
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Tester created successfully!'
                    })
                );
            })
            .catch(err =>
                dispatch(
                    showNotification({
                        type: 'error',
                        message: err.message
                    })
                )
            );
    };
};

export const verifyUserOnSignUp = adminPayload => {
    const payload = {
        ...adminPayload,
        UserAttributes: [
            {
                Name: 'email_verified',
                Value: 'true'
            }
        ]
    };

    return async dispatch => {
        return await COGNITO_CLIENT.adminUpdateUserAttributes(
            payload,
            (err, data) => {
                if (err) {
                    console.log('Error,, ', err);
                } else {
                    console.log('Success ', data);
                }
            }
        );
    };
};

export const createUserByAdmin = ({ email, family_name, given_name }) => {
    const adminPayload = {
        UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
        Username: email
    };

    const payload = {
        ...adminPayload,
        DesiredDeliveryMediums: ['EMAIL'],
        TemporaryPassword: TEMP_PASSWORD(),
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            },
            {
                Name: 'custom:firstName',
                Value: family_name
            },
            {
                Name: 'custom:surname',
                Value: given_name
            }
        ]
    };

    return async dispatch => {
        return await COGNITO_CLIENT.adminCreateUser(payload, (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                const userParams = {
                    email: email,
                    firstName: family_name,
                    lastName: given_name
                };
                dispatch(createUser(userParams));
                dispatch(reset('CreateUser'));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'New user created successfully!'
                    })
                );
                // dispatch(verifyUserOnSignUp(adminPayload));
            }
        });
    };
};

export const deleteWupUser = ({ id, email }) => {
    const payload = {
        UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
        Username: email
    };
    return async dispatch => {
        return await COGNITO_CLIENT.adminDeleteUser(payload, (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                dispatch(deleteUser({ id }));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Successfully deleted!'
                    })
                );
            }
        });
    };
};

export const deleteUserByAdmin = (email, testerId) => {
    const payload = {
        UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
        Username: email
    };
    return async dispatch => {
        return await COGNITO_CLIENT.adminDeleteUser(payload, (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                dispatch(removeTester(testerId));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Successfully deleted!'
                    })
                );
                history.push('/tester');
            }
        });
    };
};

export const deleteOwnAccount = (email, testerId) => {
    const payload = {
        UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
        Username: email
    };
    return async dispatch => {
        return await COGNITO_CLIENT.adminDeleteUser(payload, (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                dispatch(removeTester(testerId));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Account deleted!'
                    })
                );
                dispatch(logoutUser());
            }
        });
    };
};

export const getAuthUserInfo = () => {
    return async dispatch => {
        const res = await getUser();

        return res;
    };
};

export const setAuthUserInfo = () => {
    return async dispatch => {
        const res = await getUser();
        Object.prototype.hasOwnProperty.call(res, 'attributes') &&
            dispatch({
                type: SET_AUTH_USER_INFO,
                payload: res.attributes
            });

        return res;
    };
};

export const updateAuthUserPassword = payload => {
    return async dispatch => {
        const res = await changePassword(payload);
        if (res === 'SUCCESS') {
            dispatch(
                showNotification({
                    type: 'success',
                    message: 'Password changed successfully!'
                })
            );
            return 200;
        } else {
            dispatch(showNotification({ type: 'error', message: res.message }));
        }
    };
};

const logoutAction = () => ({
    type: LOGOUT
});

export const logoutUser = () => {
    return async dispatch => {
        Auth.signOut()
            .then(data => {
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Sign out successfully!'
                    })
                );
                dispatch(logoutAction());
                history.push('/');
            })
            .catch(err => err);
    };
};
