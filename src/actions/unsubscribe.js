import { showNotification } from './notification';
import { unsubscribeTester } from './testers';

export const unsubscribe = payload => {
    return async dispatch => {
        if (!payload) {
            window.location.href('/');
            dispatch(
                showNotification({
                    type: 'error',
                    message: 'Something went wrong!'
                })
            );
        } else {
            dispatch(unsubscribeTester(payload));
        }
    };
};
