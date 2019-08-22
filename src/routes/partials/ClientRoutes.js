import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ClientHome, ClientSearch, ClientSingle } from 'views';

const ClientRoutes = ({ match }) => {
	return (
		<Switch>
			<Route
				path={[`${match.path}`, `${match.path}/all`]}
				exact
				component={ClientHome}
			/>
			<Route path={`${match.path}/search`} component={ClientSearch} />
			<Route path={`${match.path}/:id`} component={ClientSingle} />
			<Route path={'*'} component={ClientHome} />
		</Switch>
	);
};

export { ClientRoutes as default, ClientRoutes };
