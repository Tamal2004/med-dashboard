import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CircularLoader } from 'components';

// Local
import { withModalProvider } from 'components';
const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'));

const loaderWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
};

const Loader = () => (
    <div style={loaderWrapper}>
        <CircularLoader />
    </div>
);

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
