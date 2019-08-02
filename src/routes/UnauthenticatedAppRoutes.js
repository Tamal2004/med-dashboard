import React, { Fragment, PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NotFoundPage = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Redirect to='/' />} />
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
);

class UnauthenticatedAppRoutes extends PureComponent {
    render() {
        return (
            <Fragment>
                <Switch>
                    {/*Not found*/}
                    <NotFoundPage path='*' />
                </Switch>
            </Fragment>
        );
    }
}

const mapState = state => {};

const _UnauthenticatedAppRoutes = withRouter(
    connect(mapState)(UnauthenticatedAppRoutes)
);

export {
    _UnauthenticatedAppRoutes as default,
    _UnauthenticatedAppRoutes as UnauthenticatedAppRoutes
};
