import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { CreateUser, ProfileHome } from 'views';

const AdminAccountRoutes = ({ match }) => {
	return (
		<Switch>
			<Route path={match.path} exact component={ProfileHome} />
			<Route path={`${match.path}/new-user`} component={CreateUser} />
			<Route path={'*'} component={ProfileHome} />
		</Switch>
	);
};

export { AdminAccountRoutes as default, AdminAccountRoutes };
