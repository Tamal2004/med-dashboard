import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// Material
import { makeStyles } from '@material-ui/core/styles';

// Components
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Divider,
    Button,
    Select,
    Input,
    Editor
} from 'components';

// Libs
import { validateRequired } from 'libs';

// Selectors
import { selectContactTypes, selectIncompleteProjects } from 'selectors';

// Actions
import { listIncompleteProjects } from 'actions';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        width: breakpoints.values.sm,
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        overflow: 'unset'
    },
    gridContainer: {
        padding: 16
    },
    editor: {
        margin: spacing(2),
        marginBottom: spacing(3)
    },
    footer: {
        padding: spacing(4),
        paddingBottom: spacing(2),
        paddingTop: spacing(2),
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const MailModal = ({
    change,
    onClose,
    projects,
    contactTypes,
    listIncompleteProjects,
    needsProject,
    needsContactType,
    invalid,
    handleSubmit,
    submitting,
    to
}) => {
    const c = useStyles();

    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        needsProject &&
            listIncompleteProjects().then(() => setProjectsLoading(false));
    }, [needsProject, listIncompleteProjects]);

    console.log('invalid', invalid);
    console.log('submitting', submitting);

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>{`Mail Tester${
                to.length > 1 ? 's' : ''
            }`}</ModalHeader>
            <ModalContent className={c.root}>
                <Input label='From' name='from' active={false} width={8} />
                <Input label='To' name='to' active={false} width={8} />

                <Input
                    label='Subject'
                    name='subject'
                    placeholder='Subject'
                    required
                    width={8}
                />

                {needsProject && (
                    <Select
                        label='Project'
                        name='project'
                        data={projects}
                        disabled={projectsLoading}
                        width={8}
                        required
                    />
                )}
                {needsContactType && (
                    <Select
                        label='Contact type'
                        name='contactType'
                        data={contactTypes}
                        width={8}
                        required
                    />
                )}
                <div className={c.editor}>
                    <Editor name='body' label='Body' placeholder='Email body' />
                </div>
            </ModalContent>
            <Divider />
            <ModalFooter className={c.footer}>
                <Button
                    size='large'
                    disabled={invalid || submitting}
                    onClick={handleSubmit}
                >
                    Send Mail
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

const validate = ({ body, ...values }, { needsProject, needsContactType }) => {
    const required = ['subject', 'body'];

    // Check empty body
    const trimmedBody = body && body === '<p><br></p>' ? '' : body;

    if (needsProject) required.push('project');
    if (needsContactType) required.push('contactType');

    return { ...validateRequired({ body: trimmedBody, ...values }, required) };
};

const mapState = (state, { from, to, body, subject }) => {
    return {
        projects: selectIncompleteProjects(state),
        contactTypes: selectContactTypes(state),
        initialValues: {
            from,
            to: to.length > 1 ? `${to.length} Testers` : to[0] || '',
            body: body || '',
            subject: subject || ''
        }
    };
};

const mapDispatch = {
    listIncompleteProjects
};

const onSubmit = (values, d, { to, handleMail, onClose }) =>
    handleMail({ ...values, to }).then(() => onClose());

MailModal.defaultProps = {
    to: [],
    subject: '',
    body: '',
    needsProject: false,
    needsContactType: false
};

MailModal.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.array.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    needsProject: PropTypes.bool,
    needsContactType: PropTypes.bool
};

const _MailModal = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'MailModal',
        validate,
        onSubmit,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true
    })
)(MailModal);

export { _MailModal as default, _MailModal as MailModal };
