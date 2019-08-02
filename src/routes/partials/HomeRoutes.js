import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TesterHome } from 'views';

const HomeRoutes = ({ match }) => {
	return (
		<Switch>
			<Route path={'/'} exact component={TesterHome} />
			<Route path={'*'} component={TesterHome} />
		</Switch>
	);
};

export { HomeRoutes as default, HomeRoutes };
