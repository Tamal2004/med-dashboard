import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Logout, ProfileHome } from 'views';

const TesterAccountRoutes = ({ match }) => {
	return (
		<Switch>
			<Route path={match.path} exact component={ProfileHome} />
			<Route path={`${match.path}/logout`} component={Logout} />
			<Route path={'*'} component={ProfileHome} />
		</Switch>
	);
};

export { TesterAccountRoutes as default, TesterAccountRoutes };
