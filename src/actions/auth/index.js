import AWS from 'aws-sdk';
import { Auth, graphqlOperation } from 'aws-amplify';
import { history } from 'libs/history';
import { reset } from 'redux-form';

//Local
import { SET_AUTH_USER_INFO, UPDATE_USER_INFO, LOGOUT } from 'actionTypes';
import { showNotification } from '../notification';
import { removeTester } from '../testers';
import { createUser, deleteUser } from '../users';

// Graph QL
import { UpdateUser, FetchUserByEmail } from 'graphql/users';
import config from '../../aws-exports';
import { composeNewAccount } from 'libs';
import { sendMail } from 'services';

// Selectors
import { selectIsTester, selectEmail, selectFullName } from 'selectors';
import API from '@aws-amplify/api';

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

export const testerSignUp = ({ id, email, firstName, surname }) => async (
    dispatch,
    getState
) =>
    await new Promise(resolve => {
        const password = TEMP_PASSWORD();

        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email,
            DesiredDeliveryMediums: ['EMAIL'],
            TemporaryPassword: password,
            MessageAction: 'SUPPRESS',
            UserAttributes: [
                {
                    Name: 'email_verified',
                    Value: 'true'
                },
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'custom:firstName',
                    Value: firstName
                },
                {
                    Name: 'custom:surname',
                    Value: surname
                },
                {
                    Name: 'custom:testerId',
                    Value: id
                }
            ]
        };

        COGNITO_CLIENT.adminCreateUser(payload, async err => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                const store = getState();
                let internalUserDetails = {};
                if (!selectIsTester(store)) {
                    internalUserDetails = {
                        from: selectEmail(store),
                        userFullName: selectFullName(store)
                    };
                }

                await sendMail(
                    composeNewAccount({
                        ...internalUserDetails,
                        firstName,
                        email,
                        password,
                        testerId: id
                    })
                );
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Tester account creation successful!'
                    })
                );
            }
            return resolve();
        });
    });

export const createUserByAdmin = ({
    email,
    family_name,
    given_name
}) => async dispatch =>
    await new Promise(resolve => {
        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email,
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
        COGNITO_CLIENT.adminCreateUser(payload, async err => {
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
                await dispatch(createUser(userParams));
                dispatch(reset('CreateUser'));
            }
            return resolve();
        });
    });

export const deleteWupUser = ({
    id,
    email,
    ownAccount = false
}) => async dispatch =>
    await new Promise(resolve => {
        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email
        };
        COGNITO_CLIENT.adminDeleteUser(payload, async err => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                if (ownAccount) dispatch(logoutUser());
                await dispatch(deleteUser({ id }));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Successfully deleted!'
                    })
                );
            }
            return resolve();
        });
    });

export const deleteUserByAdmin = (email, testerId) => async dispatch =>
    await new Promise(resolve => {
        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email
        };
        COGNITO_CLIENT.adminDeleteUser(payload, async err => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                await dispatch(removeTester(testerId));
                history.push('/tester');
            }
            return resolve();
        });
    });

export const unsubscribeUser = email => async dispatch =>
    await new Promise(resolve => {
        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email
        };
        COGNITO_CLIENT.adminDeleteUser(payload, (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                window.location.href = '/';
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'You have been successfully unsubscribed!'
                    })
                );
            }
            return resolve();
        });
    });

// Check
export const deleteOwnAccount = (email, testerId) => async dispatch =>
    await new Promise(resolve => {
        const payload = {
            UserPoolId: REACT_APP_COGNITO_USER_POOL_ID,
            Username: email
        };
        COGNITO_CLIENT.adminDeleteUser(payload, async (err, data) => {
            if (err) {
                dispatch(
                    showNotification({ type: 'error', message: err.message })
                );
            } else {
                await dispatch(removeTester(testerId));
                dispatch(logoutUser());
            }
            return resolve();
        });
    });

export const changeUserInfo = ({
    email,
    firstName,
    surname
}) => async dispatch => {
    const {
        data: {
            listUsers: {
                items: [{ id }]
            }
        }
    } = await API.graphql(
        graphqlOperation(FetchUserByEmail, { filter: { email: { eq: email } } })
    );

    await API.graphql(
        graphqlOperation(UpdateUser, {
            input: { id, firstName, lastName: surname }
        })
    );
    await dispatch(changCongnitoUserInfo({ email, firstName, surname }));
};

export const changCongnitoUserInfo = ({
    email,
    firstName,
    surname
}) => async dispatch =>
    await new Promise((resolve, reject) => {
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
        COGNITO_CLIENT.adminUpdateUserAttributes(payload, err => {
            if (err) {
                dispatch(
                    showNotification({
                        type: 'error',
                        message: err.message
                    })
                );
                return reject();
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
                return resolve();
            }
        });
    });

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
