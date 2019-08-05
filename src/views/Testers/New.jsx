
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

class TesterApplication extends Component {
    render() {
        return 'TESTER Application';
    }
}


const mapState = state => ({});

const mapDispatch = {};

const _TesterApplication = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterApplication'
    })
)(TesterApplication);

export {
    _TesterApplication as default,
    _TesterApplication as TesterNew
};
