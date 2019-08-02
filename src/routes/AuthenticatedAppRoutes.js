import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateContainer } from 'views/containers';
import { AccountHome, ClientHome, ProjectsHome, TestersHome } from 'views';

const NotFoundPage = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Redirect to='/' />} />
);

class AuthenticatedAppRoutes extends PureComponent {
    render() {
        return (
            <PrivateContainer>
                <Switch>
                    {/*Default*/}
                    <Route path={'/'} exact component={TestersHome} />

                    {/*Account*/}
                    <Route path={'/profile'} component={AccountHome} />

                    {/*Client*/}
                    <Route
                        path={['/clients', '/clients/all']}
                        component={ClientHome}
                    />

                    {/*Project*/}
                    <Route
                        path={['/projects', '/projects/all']}
                        component={ProjectsHome}
                    />

                    {/*Tester*/}
                    <Route
                        path={['/testers', '/testers/all']}
                        component={TestersHome}
                    />

                    {/*Not found*/}
                    <NotFoundPage path='*' />
                </Switch>
            </PrivateContainer>
        );
    }
}

const mapState = state => {
    return {};
};

const _AuthenticatedAppRoutes = withRouter(
    connect(mapState)(AuthenticatedAppRoutes)
);

export {
    _AuthenticatedAppRoutes as default,
    _AuthenticatedAppRoutes as AuthenticatedAppRoutes
};
