import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import { withModalProvider } from 'components';
const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'));

const Loader = () => <div>...Loading</div>;

class App extends PureComponent {
    render() {
        return (
            <Suspense fallback={<Loader />}>
                {true ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </Suspense>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default compose(
    connect(mapStateToProps),
    withModalProvider
)(App);
