import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AllUsers, ProfileHome } from 'views';

const AdminAccountRoutes = ({ match }) => {
	return (
		<Switch>
			<Route path={match.path} exact component={ProfileHome} />
			<Route path={`${match.path}/users`} component={AllUsers} />
			<Route path={'*'} component={ProfileHome} />
		</Switch>
	);
};

export { AdminAccountRoutes as default, AdminAccountRoutes };
