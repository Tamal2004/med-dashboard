import React, { Fragment, PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { HelloWorld } from 'views';

const NotFoundPage = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Redirect to='/' />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
);

class AuthenticatedAppRoutes extends PureComponent {
    render() {
        return (
            <Fragment>
                <Switch>
                    {/*Private*/}
                    <PrivateRoute path='/' exact component={HelloWorld} />
                    {/*Not found*/}
                    <NotFoundPage path='*' />
                </Switch>
            </Fragment>
        );
    }
}

const mapState = state => {};

const _AuthenticatedAppRoutes = withRouter(
    connect(mapState)(AuthenticatedAppRoutes)
);

export {
    _AuthenticatedAppRoutes as default,
    _AuthenticatedAppRoutes as AuthenticatedAppRoutes
};
