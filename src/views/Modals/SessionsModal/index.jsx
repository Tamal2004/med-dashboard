import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired, validateTime } from 'libs';
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Select,
    Input,
    MultiInput,
    DateInput
} from 'components';

// Selectors
import {
    selectIncompleteProjects,
    selectTestingLocations,
    selectTesterId,
    selectSessionProfiles
} from 'selectors';

// Actions
import { listIncompleteProjects, createSession } from 'actions';

// Normalizers
import { normalizeTime } from 'normalizers';

const SessionsModal = ({
    projects,
    profiles,
    facilities,
    data,
    onClose,
    listIncompleteProjects,
    handleSubmit,
    invalid,
    submitting
}) => {
    const c = useStyles();
    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        listIncompleteProjects().then(() => setProjectsLoading(false));
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Add Tester to a Session</ModalHeader>
            <ModalContent className={c.root}>
                <Select
                    label='Project'
                    name='project'
                    data={projects}
                    required
                    disabled={projectsLoading}
                />
                <Select
                    label='Tester Profile'
                    name='profile'
                    data={profiles}
                    required
                    disabled={projectsLoading}
                />
                <Select
                    label='Testing Location'
                    name='location'
                    data={facilities}
                    required
                />
                <DateInput
                    label='Date'
                    name='date'
                    placeholder='dd-mm-yyyy'
                    required
                />
                <Input
                    label='Time'
                    name='time'
                    placeholder='e.g. 16:30'
                    required
                    normalize={normalizeTime}
                    validate={validateTime}
                />
                <MultiInput name='notes' placeholder='Notes' />
            </ModalContent>
            <Divider />
            <ModalFooter className={c.footer}>
                <Button
                    variant='outlined'
                    color='secondary'
                    size='large'
                    onClick={onClose || submitting}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={handleSubmit}
                    disabled={invalid || submitting}
                >
                    Add Session
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

SessionsModal.defaultProps = {};

SessionsModal.propTypes = {};

const mapState = state => ({
    testerId: selectTesterId(state),
    projects: selectIncompleteProjects(state),
    profiles: selectSessionProfiles(
        state,
        formValueSelector('TesterSessions')(state, 'project')
    ),
    facilities: selectTestingLocations(state)
});

const mapDispatch = { listIncompleteProjects };

export const validate = values => {
    const required = ['project', 'profile', 'location', 'date', 'time'];

    return { ...validateRequired(values, required) };
};

const onSubmit = ({ project, ...values }, dispatch, { testerId, onClose }) =>
    dispatch(
        createSession({
            sessionTesterId: testerId,
            sessionProjectId: project,
            ...values
        })
    ).then(() => onClose());

const _SessionsModal = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterSessions',
        validate,
        onSubmit
    })
)(SessionsModal);

export { _SessionsModal as default, _SessionsModal as SessionsModal };
