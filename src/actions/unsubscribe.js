import { showNotification } from './notification';
import { unsubscribeTester } from './testers';

export const unsubscribe = payload => async dispatch => {
    if (!payload) {
        window.location.href('/');
        dispatch(
            showNotification({
                type: 'error',
                message: 'Something went wrong!'
            })
        );
    } else {
        await dispatch(unsubscribeTester(payload));
    }
};
