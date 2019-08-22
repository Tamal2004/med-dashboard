// export * from './AuthenticatedAppRoutes';
// export * from './UnauthenticatedAppRoutes';

import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateContainer } from 'views/Containers';
import {
	AccountRoutes,
	ClientRoutes,
	HomeRoutes,
	ProjectRoutes,
	TesterRoutes
} from './partials';

class AuthenticatedAppRoutes extends PureComponent {
	render() {
		return (
			<PrivateContainer>
				<Switch>
					{/*Default*/}
					<Route path={'/'} exact component={HomeRoutes} />

					{/*Account*/}
					<Route path={'/profile'} component={AccountRoutes} />

					{/*Client*/}
					<Route path={'/client'} component={ClientRoutes} />

					{/*Project*/}
					<Route path={'/project'} component={ProjectRoutes} />

					{/*Tester*/}
					<Route path={'/tester'} component={TesterRoutes} />
				</Switch>
			</PrivateContainer>
		);
	}
}

const mapState = state => {
	return {};
};

const _AuthenticatedAppRoutes = withRouter(
	connect(mapState)(AuthenticatedAppRoutes)
);

export {
	_AuthenticatedAppRoutes as default,
	_AuthenticatedAppRoutes as AuthenticatedAppRoutes
};
