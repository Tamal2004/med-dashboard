import React, { Suspense } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ApolloProvider } from '@apollo/react-hooks';

// AWS
import { AuthPiece } from 'aws-amplify-react';

// Local
import { withModalProvider, BarLoader } from 'components';
import { setAuthUserInfo } from 'actions';
import Routes from 'routes';

import { client1 } from './client';

class App extends AuthPiece {
    constructor(props) {
        super(props);
        this._validAuthStates = ['signedIn'];
    }

    state = {
        loading: true
    };

    componentDidMount() {
        this.props
            .setAuthUserInfo()
            .then(data => this.setState({ loading: false }));
    }

    showComponent(theme) {
        return (
            <Suspense fallback={<BarLoader fullScreen />}>
                <ApolloProvider client={client1}>
                    {this.state.loading ? <BarLoader fullScreen /> : <Routes />}
                </ApolloProvider>
            </Suspense>
        );
    }
}

const mapDispatch = {
    setAuthUserInfo
};

export default compose(
    withModalProvider,
    connect(
        null,
        mapDispatch
    )
)(App);
