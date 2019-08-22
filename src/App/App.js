import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CircularLoader } from 'components';

// AWS
import { AuthPiece } from 'aws-amplify-react';

// Local
import { withModalProvider } from 'components';
import Routes from 'routes';
import { setAuthUserInfo } from 'actions';

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
        !props.auth.email && props.setAuthUserInfo();
    }

    showComponent(theme) {
        return (
            <Suspense fallback={<Loader />}>
                <Routes />
            </Suspense>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatch = {
    setAuthUserInfo
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatch
    ),
    withModalProvider
)(App);
