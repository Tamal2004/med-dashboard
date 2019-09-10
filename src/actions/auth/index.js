import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { history } from 'libs/history';
import { reset } from 'redux-form';

//Local
import { SET_AUTH_USER_INFO, UPDATE_USER_INFO, LOGOUT } from 'actionTypes';
import { showNotification } from '../notification';
import { removeTester } from '../testers';
import {
    createUser,
    updateUser,
    deleteUser,
    fetchUserIdByEmail
} from '../users';
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
                        message: 'Tester account creation successful!'
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
            }
        });
    };
};

export const deleteWupUser = ({ id, email, ownAccount = false }) => {
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
                if (ownAccount) dispatch(logoutUser());
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
                history.push('/tester');
            }
        });
    };
};

export const unsubscribeUser = email => {
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
                history.replace('/');
                window.location.href = '/';
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'You have successfully unsubscribed!'
                    })
                );
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
                dispatch(logoutUser());
            }
        });
    };
};

export const changeUserInfo = ({
    email,
    firstName,
    surname
}) => async dispatch => {
    const userIdArr = await dispatch(fetchUserIdByEmail(email));

    if (userIdArr.length) {
        const id = userIdArr[0].id;
        const updateUserSuccess = await dispatch(
            updateUser({ id, firstName, lastName: surname })
        );

        if (updateUserSuccess === 200) {
            await dispatch(
                changCongnitoUserInfo({ email, firstName, surname })
            );
            return 200;
        }
    }
};

export const changCongnitoUserInfo = ({ email, firstName, surname }) => {
    const payload = {
        UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
        Username: email,
        UserAttributes: [
            {
                Name: 'custom:firstName',
                Value: firstName
            },
            {
                Name: 'custom:surname',
                Value: surname
            }
        ]
    };

    return async dispatch => {
        return await COGNITO_CLIENT.adminUpdateUserAttributes(
            payload,
            (err, data) => {
                if (err) {
                    dispatch(
                        showNotification({
                            type: 'error',
                            message: err.message
                        })
                    );
                    return null;
                } else {
                    dispatch({
                        type: UPDATE_USER_INFO,
                        payload: { firstName, surname }
                    });
                    dispatch(
                        showNotification({
                            type: 'success',
                            message: 'Update successful!'
                        })
                    );
                    return 200;
                }
            }
        );
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
        try {
            await changePassword(payload);
            dispatch(
                showNotification({
                    type: 'success',
                    message: 'Password changed successfully!'
                })
            );
            return 200;
        } catch (err) {
            dispatch(showNotification({ type: 'error', message: err.message }));
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
