import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import { history } from 'libs/history';
import { reset } from 'redux-form';
//Local
import { SET_AUTH_USER_INFO } from 'actionTypes';
import { showNotification } from 'actions';
import config from '../../aws-exports';

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

// const getSession = () => {
//     return Auth.currentSession()
//         .then(data => {
//             console.log(data);
//         })
//         .catch(err => console.log(err));
// };

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
            temporaryPassword: PASS,
            attributes: {
                name: firstName,
                email,
                family_name: firstName,
                given_name: surname,
                'custom:testerId': id
            }
        })
            .then(() => {
                //TODO: send an email with generated password, variable: PASS
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'Sign up successful!'
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

// export const signUp = ({
//     username,
//     password,
//     name,
//     email,
//     family_name,
//     given_name,
//     testerId
// }) => {
//     return Auth.signUp({
//         username,
//         password,
//         attributes: {
//             name: 'report.nabil@gmail.com',
//             email: 'report.nabil@gmail.com',
//             family_name: 'Nabil',
//             given_name: 'Ahmad',
//             'custom:testerId': '123'
//         }
//     })
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// };

export const createUserByAdmin = ({
    email,
    family_name,
    given_name,
    username
}) => {
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
                Name: 'family_name',
                Value: family_name
            },
            {
                Name: 'given_name',
                Value: given_name
            },
            {
                Name: 'name',
                Value: family_name
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
                dispatch(reset('CreateUser'));
                dispatch(
                    showNotification({
                        type: 'success',
                        message: 'New user created successfully!'
                    })
                );
            }
        });
    };
};

export const deleteUserByAdmin = email => {
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

export const deleteOwnAccount = email => {
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
                history.push('/');
            })
            .catch(err => err);
    };
};
