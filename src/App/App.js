import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Local
import theme from 'components/theme';
const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'));

const Loader = () => <div>...Loading</div>;

class App extends PureComponent {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />

				{
					<Suspense fallback={<Loader />}>
						{true ? <AuthenticatedApp /> : <UnauthenticatedApp />}
					</Suspense>
				}

				{/*<NotificationContainer />*/}
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(App);
