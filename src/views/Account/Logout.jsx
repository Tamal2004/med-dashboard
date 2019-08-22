import { Auth } from 'aws-amplify';
import { history } from 'libs/history';

const signOut = () =>
	Auth.signOut()
		.then(data => {
			history.push('/');
		})
		.catch(err => console.log(err));

const Logout = () => {
	signOut();
	return null;
};

export { Logout as default, Logout };
