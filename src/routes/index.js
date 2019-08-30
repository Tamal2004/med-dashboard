import React, { PureComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateContainer } from 'views/Containers';
import { TesterSingle, NotFoundPage } from 'views';
import {
    AdminAccountRoutes,
    TesterAccountRoutes,
    ClientRoutes,
    HomeRoutes,
    ProjectRoutes,
    TesterRoutes
} from './partials';

const AdminUserRoutes = () => (
    <Switch>
        <Route path={'/'} exact component={HomeRoutes} />
        <Route path={'/client'} component={ClientRoutes} />
        <Route path={'/project'} component={ProjectRoutes} />
        <Route path={'/tester'} component={TesterRoutes} />
        <Route path={'/profile'} component={AdminAccountRoutes} />
        <Route path={'*'} component={NotFoundPage} />
    </Switch>
);

const TesterUserRoutes = () => (
    <Switch>
        <Route path={'/'} exact component={TesterSingle} />
        <Route path={'/profile'} component={TesterAccountRoutes} />
        <Route path={'*'} component={NotFoundPage} />
    </Switch>
);

class Routes extends PureComponent {
    render() {
        const { isTester } = this.props.auth;
        return (
            <PrivateContainer>
                {!isTester ? <AdminUserRoutes /> : <TesterUserRoutes />}
            </PrivateContainer>
        );
    }
}

const mapState = ({ auth }) => ({ auth });

const _Routes = withRouter(connect(mapState)(Routes));

export { _Routes as default, _Routes as Routes };
