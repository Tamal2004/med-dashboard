import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AllUsers, ProfileHome, AdminHome } from 'views';

const AdminAccountRoutes = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path} exact component={ProfileHome} />
            <Route path={`${match.path}/admin`} component={AdminHome} />
            <Route path={`${match.path}/users`} component={AllUsers} />
            <Route path={'*'} component={ProfileHome} />
        </Switch>
    );
};

export { AdminAccountRoutes as default, AdminAccountRoutes };
