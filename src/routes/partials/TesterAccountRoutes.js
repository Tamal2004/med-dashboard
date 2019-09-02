import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProfileHome } from 'views';

const TesterAccountRoutes = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path} exact component={ProfileHome} />
            <Route path={'*'} component={ProfileHome} />
        </Switch>
    );
};

export { TesterAccountRoutes as default, TesterAccountRoutes };
