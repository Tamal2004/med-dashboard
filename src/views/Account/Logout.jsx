import { Auth } from 'aws-amplify';
import { history } from 'libs/history';

const signOut = () =>
	Auth.signOut()
		.then(data => {
			history.push('/');
			window.location.reload(false);
		})
		.catch(err => console.log(err));

const Logout = () => {
	signOut();
	return null;
};

export { Logout as default, Logout };
