import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired, today } from 'libs';
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Select,
    MultiInput
} from 'components';

// Selectors
import {
    selectContactTypes,
    selectIncompleteProjects,
    selectTesterId,
    selectFullName
} from 'selectors';

// Actions
import { createContactNote, listIncompleteProjects } from 'actions';

const ContactsModal = ({
    contactTypes,
    projects,
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
            <ModalHeader onClose={onClose}>Create New Contact Note</ModalHeader>
            <ModalContent className={c.root}>
                <Select
                    label='Contact Type'
                    name='type'
                    data={contactTypes}
                    required
                />
                <Select
                    label='Project'
                    name='project'
                    data={projects}
                    required
                    disabled={projectsLoading}
                />
                <MultiInput name='note' placeholder='Message details' />
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
                    onClick={async () => await handleSubmit()}
                    disabled={invalid}
                    enableLoader
                >
                    Add Note
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

ContactsModal.defaultProps = {};

ContactsModal.propTypes = {};

const mapState = state => ({
    testerId: selectTesterId(state),
    username: selectFullName(state),
    projects: selectIncompleteProjects(state),
    contactTypes: selectContactTypes(state)
});

const mapDispatch = { listIncompleteProjects };

export const validate = values => {
    const required = ['type', 'project', 'note'];

    return { ...validateRequired(values, required) };
};

const onSubmit = (
    { project, ...values },
    dispatch,
    { testerId, username, onClose }
) => {
    const contactNote = {
        contactNoteTesterId: testerId,
        contactNoteProjectId: project,
        date: today(),
        contactedBy: username,
        ...values
    };

    dispatch(createContactNote(contactNote)).then(() => onClose());
};

const _ContactsModal = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterContacts',
        validate,
        onSubmit
    })
)(ContactsModal);

export { _ContactsModal as default, _ContactsModal as ContactsModal };
