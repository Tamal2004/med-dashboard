import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProjectHome, ProjectNew, ProjectSingle, ProjectReport } from 'views';

const ProjectRoutes = ({ match }) => {
	return (
		<Switch>
			<Route
				path={[`${match.path}`, `${match.path}/all`]}
				exact
				component={ProjectHome}
			/>
			<Route path={`${match.path}/new`} component={ProjectNew} />
			<Route path={`${match.path}/report`} component={ProjectReport} />
			<Route path={`${match.path}/:id`} component={ProjectSingle} />
			<Route path={'*'} component={ProjectHome} />
		</Switch>
	);
};

export { ProjectRoutes as default, ProjectRoutes };
