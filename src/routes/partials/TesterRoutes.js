import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TesterHome, TesterNew, TesterSearch, TesterSingle } from 'views';

const TesterRoutes = ({ match }) => {
    return (
        <Switch>
            <Route
                path={[`${match.path}`, `${match.path}/all`]}
                exact
                component={TesterHome}
            />
            <Route path={`${match.path}/new`} component={TesterNew} />
            <Route path={`${match.path}/search`} component={TesterSearch} />
            <Route path={`${match.path}/:id`} component={TesterSingle} />
            <Route path={'*'} component={TesterHome} />
        </Switch>
    );
};

export { TesterRoutes as default, TesterRoutes };
