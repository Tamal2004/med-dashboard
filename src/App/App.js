import React, { Suspense } from 'react';
import { compose } from 'redux';
import { CircularLoader } from 'components';

// AWS
import { AuthPiece } from 'aws-amplify-react';

// Local
import { withModalProvider } from 'components';
import Routes from 'routes';

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

class App extends AuthPiece {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signedIn'];
    }

    showComponent(theme) {
        return (
            <Suspense fallback={<Loader />}>
                <Routes />
            </Suspense>
        );
    }
}

export default compose(withModalProvider)(App);
