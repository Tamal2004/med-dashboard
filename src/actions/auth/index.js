import { Auth } from 'aws-amplify';

import { SET_AUTH_USER_INFO } from 'actionTypes';
import { showNotification } from 'actions';

/***********
 * API CALL *
 ************/
const getUser = () => {
    return Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
        .then(({ attributes }) => ({
            attributes
        }))
        .catch(err => err);
};

const getSession = () => {
    return Auth.currentSession()
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
};

export const signUp = () => {
    return Auth.signUp({
        username: 'report.nabil@gmail.com',
        password: 'password',
        attributes: {
            name: 'report.nabil@gmail.com',
            email: 'report.nabil@gmail.com',
            family_name: 'Nabil',
            given_name: 'Ahmad',
            'custom:testerId': '123'
        }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err));
};

const changePassword = ({ oldPassword, newPassword }) => {
    console.log('changePassword');

    return Auth.currentAuthenticatedUser()
        .then(user => Auth.changePassword(user, oldPassword, newPassword))
        .then(data => data)
        .catch(err => err);
};

/**********
 * ACTIONS *
 ***********/

export const setAuthUserInfo = () => {
    return async dispatch => {
        const res = await getUser();
        Object.prototype.hasOwnProperty.call(res, 'attributes') &&
            dispatch({
                type: SET_AUTH_USER_INFO,
                payload: res.attributes
            });

        // getSession();
    };
};

export const updateAuthUserPassword = payload => {
    return async dispatch => {
        const res = await changePassword(payload);
        if (res === 'SUCCESS') {
            return 200;
        } else {
            //show snack-bar error
            console.log('password change error', res, res.message, res.code);
            dispatch(showNotification({ type: 'error', message: res.message }));
        }
    };
};
