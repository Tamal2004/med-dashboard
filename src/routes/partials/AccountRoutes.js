import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AccountHome } from 'views';

const AccountRoutes = ({ match }) => {
	return (
		<Switch>
			<Route path={match.path} exact component={AccountHome} />
			<Route path={'*'} component={AccountHome} />
		</Switch>
	);
};

export { AccountRoutes as default, AccountRoutes };
