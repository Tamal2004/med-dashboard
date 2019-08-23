import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProjectHome } from 'views';

const HomeRoutes = ({ match }) => {
    return (
        <Switch>
            <Route path={'/'} exact component={ProjectHome} />
            <Route path={'*'} component={ProjectHome} />
        </Switch>
    );
};

export { HomeRoutes as default, HomeRoutes };
