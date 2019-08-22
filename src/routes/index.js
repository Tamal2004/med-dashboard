// export * from './AuthenticatedAppRoutes';
// export * from './UnauthenticatedAppRoutes';

import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateContainer } from 'views/Containers';
import { TesterSingle } from 'views';
import {
	AccountRoutes,
	ClientRoutes,
	HomeRoutes,
	ProjectRoutes,
	TesterRoutes
} from './partials';

class AuthenticatedAppRoutes extends PureComponent {
	render() {
		const { isTester, name } = this.props.auth;
		return (
			<PrivateContainer>
				<Switch>
					{!isTester ? (
						<Fragment>
							<Route path={'/'} exact component={HomeRoutes} />
							<Route path={'/client'} component={ClientRoutes} />
							<Route
								path={'/project'}
								component={ProjectRoutes}
							/>
							<Route path={'/tester'} component={TesterRoutes} />
						</Fragment>
					) : (
						<Route path={'/'} exact component={TesterSingle} />
					)}
					<Route path={'/profile'} component={AccountRoutes} />
					<Route path={`/tester/${name}`} component={TesterSingle} />
				</Switch>
			</PrivateContainer>
		);
	}
}

const mapState = ({ auth }) => ({ auth });

const _AuthenticatedAppRoutes = withRouter(
	connect(mapState)(AuthenticatedAppRoutes)
);

export {
	_AuthenticatedAppRoutes as default,
	_AuthenticatedAppRoutes as AuthenticatedAppRoutes
};
