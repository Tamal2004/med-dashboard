import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

// Local
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

export default connect(mapStateToProps)(App);
