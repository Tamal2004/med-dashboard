import { history } from 'libs/history';
import { showNotification } from './notification';

export const unsubscribe = payload => {
	return async dispatch => {
		console.log('action/unsubscribe => payload => ', payload);
		//on success push to home
		// dispatch(
		//           showNotification({
		//               type: 'success',
		//               message: 'Unsubscribed successfully!'
		//           })
		//       );
		// history.push("/")

		//on error
		// dispatch(
		//           showNotification({
		//               type: 'error',
		//               message: 'Something went wrong!'
		//           })
		//       );
	};
};
