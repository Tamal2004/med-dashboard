import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

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
    MultiInput,
    DateInput
} from 'components';

// Selectors
import {
    selectTesterProjects,
    selectTestingLocations,
    selectTesterId,
    selectProject,
    selectSessionProfiles
} from 'selectors';

// Actions
import { listSessionProjects, createSession } from 'actions';

// Normalizers
import { normalizeTime } from 'normalizers';

const SessionsModal = ({
    projects,
    profiles,
    facilities,
    data,
    onClose,
    listSessionProjects,
    handleSubmit,
    invalid
}) => {
    const c = useStyles();
    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        listSessionProjects().then(() => setProjectsLoading(false));
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
                />
                <MultiInput name='notes' placeholder='Notes' />
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
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={handleSubmit}
                    disabled={invalid}
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
    projects: selectTesterProjects(state),
    profiles: selectSessionProfiles(
        state,
        formValueSelector('TesterSessions')(state, 'project')
    ),
    facilities: selectTestingLocations(state)
});

const mapDispatch = { listSessionProjects };

export const validate = values => {
    const required = ['project', 'profile', 'location', 'date', 'time'];

    return { ...validateRequired(values, required) };
};

const onSubmit = ({ project, ...values }, dispatch, { testerId }) =>
    dispatch(
        createSession({
            sessionTesterId: testerId,
            sessionProjectId: project,
            ...values
        })
    );

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
