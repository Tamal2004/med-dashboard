import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormInitialValues } from 'redux-form';

// Material
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

// Local
import { validateRequired } from 'libs';
import { ConfirmationModal } from 'views/Modals';
import {
    Select,
    Input,
    DateInput,
    EditableCard,
    EditableFooter,
    CardDivider,
    IconedButton,
    withModal
} from 'components';

// Selectors
import {
    selectProjectId,
    selectProjectStatuses,
    selectProjectClients,
    selectProjectUsers
} from 'selectors';

// Normalizers
import { normalizePounds } from 'normalizers';

// Actions
import {
    listProjectClients,
    listProjectUsers,
    updateProject,
    removeProject
} from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
    footer: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ProjectDetails = ({
    id,
    projectStatuses,
    clients,
    users,
    invalid,
    listProjectClients,
    listProjectUsers,
    handleSubmit,
    reset,
    submitting,
    handleConfirmationModal,
    removeProject
}) => {
    const c = useStyles();

    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        listProjectClients();
        listProjectUsers();
    }, []);

    const confirmationProps = {
        title: 'Confirmation',
        promptText: `Are you sure you want to delete this project?`,
        cancelText: 'Cancel',
        submitText: 'Delete',
        onSubmit: () => removeProject(id)
    };

    return (
        <EditableCard
            title='Project Details'
            onEdit={() => {
                reset();
                setEditing(!isEditing);
            }}
            isEditing={isEditing}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Input
                label='Project Reference'
                name='reference'
                isCard
                active={isEditing}
                required={isEditing}
            />{' '}
            <Input
                label='Project Title'
                name='title'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Project Status'
                name='status'
                data={projectStatuses}
                isCard
                active={isEditing}
            />
            <Select
                label='Client'
                name='client'
                data={clients}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Principal Contact'
                name='principalContact'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Other Contact'
                name='otherContact'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Observed Testing Date'
                name='testingDate'
                isCard
                isRegular
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Project Cost'
                name='cost'
                isCard
                active={isEditing}
                normalize={normalizePounds}
            />
            <Input
                label='Purchase Order Number'
                name='purchaseOrderNumber'
                isCard
                active={isEditing}
            />
            <CardDivider />
            <Select
                label='Project Manager'
                name='manager'
                data={users}
                active={isEditing}
                required={isEditing}
                isCard
            />
            <Select
                label='Tester Facilitator'
                name='testerFacilitator'
                data={users}
                active={isEditing}
                isCard
            />
            <Select
                label='Client Facilitator'
                name='clientFacilitator'
                data={users}
                active={isEditing}
                isCard
            />
            <Select
                label='Main Recruiter'
                name='mainRecruiter'
                data={users}
                active={isEditing}
                isCard
            />
            <CardDivider />
            <div className={c.footer}>
                <div />
                {isEditing ? (
                    <IconedButton
                        Icon={EditIcon}
                        onClick={() => {
                            handleSubmit();
                            setEditing(!isEditing);
                        }}
                        disabled={invalid || submitting}
                    >
                        Save Edits
                    </IconedButton>
                ) : (
                    <IconedButton
                        onClick={() =>
                            handleConfirmationModal(confirmationProps)
                        }
                        Icon={DeleteIcon}
                        disabled={submitting}
                    >
                        Delete Project
                    </IconedButton>
                )}
            </div>
        </EditableCard>
    );
};

const mapState = state => {
    return {
        id: selectProjectId(state),
        clients: selectProjectClients(state),
        users: selectProjectUsers(state),
        projectStatuses: selectProjectStatuses(state),
        initialReference: getFormInitialValues('ProjectDetails')(state)
    };
};

const mapDispatch = { listProjectClients, listProjectUsers, removeProject };

const validate = values => {
    const required = [
        'title',
        'reference',
        'client',
        'principalContact',
        'testingDate',
        'manager'
    ];
    return validateRequired(values, required);
};

const onSubmit = ({ reference, client, ...values }, dispatch, { id }) => {
    const project = {
        id,
        projectClientId: client,
        reference: reference.trim(),
        ...values
    };

    return dispatch(updateProject(project));
};

const mapModal = {
    handleConfirmationModal: ConfirmationModal
};
const _ProjectDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal),
    reduxForm({
        form: 'ProjectDetails',
        validate,
        onSubmit
    })
)(ProjectDetails);

export { _ProjectDetails as default, _ProjectDetails as ProjectDetails };
