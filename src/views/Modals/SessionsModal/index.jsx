import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Select,
    Input,
    MultiInput
} from 'components';
import { Link } from 'react-router-dom';

const SessionsModal = ({ data, onClose }) => {
    const c = useStyles();
    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Add Tester to a Session</ModalHeader>
            <ModalContent className={c.root}>
                <Select label='Project' name='project' data={[]} required />
                <Select
                    label='Tester Profile'
                    name='testerProfile'
                    data={[]}
                    required
                />
                <Select
                    label='Testing Location'
                    name='testingLocation'
                    data={[]}
                    required
                />
                <Input
                    label='Date'
                    name='date'
                    placeholder='e.g. dd-mm-yyyy'
                    required
                />
                <Input
                    label='Time'
                    name='time'
                    placeholder='e.g. 16:30'
                    required
                />
                <MultiInput name='notes' placeholder='Notes'/>
            </ModalContent>
            <Divider />
            <ModalFooter className={c.footer}>
                <Button
                    variant='outlined'
                    color='secondary'
                    size='large'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button variant='contained' color='primary' size='large'>
                    Add Session
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

SessionsModal.defaultProps = {};

SessionsModal.propTypes = {};

const mapState = () => ({});
const mapDispatch = {};

const _SessionsModal = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterSessions'
    })
)(SessionsModal);

export { _SessionsModal as default, _SessionsModal as SessionsModal };
