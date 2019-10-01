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
    <PrivateContainer>
        <Switch>
            <Route path={'/'} exact component={HomeRoutes} />
            <Route path={'/client'} component={ClientRoutes} />
            <Route path={'/project'} component={ProjectRoutes} />
            <Route path={'/tester'} component={TesterRoutes} />
            <Route path={'/profile'} component={AdminAccountRoutes} />
            <Route path={'*'} component={ProjectRoutes} />
        </Switch>
    </PrivateContainer>
);

const TesterUserRoutes = () => (
    <PrivateContainer>
        <Switch>
            <Route path={'/'} exact component={TesterSingle} />
            <Route path={'/profile'} component={TesterAccountRoutes} />
            <Route path={'*'} component={TesterSingle} />
        </Switch>
    </PrivateContainer>
);

class Routes extends PureComponent {
    render() {
        const { isTester } = this.props.auth;
        return !isTester ? <AdminUserRoutes /> : <TesterUserRoutes />;
    }
}

const mapState = ({ auth }) => ({ auth });

const _Routes = withRouter(connect(mapState)(Routes));

export { _Routes as default, _Routes as Routes };
