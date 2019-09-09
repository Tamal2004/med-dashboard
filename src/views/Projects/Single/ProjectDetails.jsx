import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import API, { graphqlOperation } from '@aws-amplify/api';
import { reduxForm,getFormInitialValues } from 'redux-form';

// Local
import { CheckProjectReference } from 'graphql/project';
import { validateRequired, mapFromValue } from 'libs';
import {
    Select,
    Input,
    DateInput,
    EditableCard,
    EditableFooter,
    CardDivider
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
import { listProjectClients, listProjectUsers, updateProject } from 'actions';

const ProjectDetails = ({
    projectStatuses,
    clients,
    users,
    invalid,
    listProjectClients,
    listProjectUsers,
    handleSubmit,
    reset,
    submitting, ...rest
}) => {
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        listProjectClients();
        listProjectUsers();
    }, []);
    console.log(rest)
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
                format={v => {
                    console.log(v);
                    return v;
                }}
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
            {isEditing && (
                <EditableFooter
                    onClick={() => {
                        handleSubmit();
                        setEditing(!isEditing);
                    }}
                    disabled={invalid || submitting}
                />
            )}
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

const mapDispatch = { listProjectClients, listProjectUsers };

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

const _ProjectDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectDetails',
        validate,
        onSubmit
    })
)(ProjectDetails);

export { _ProjectDetails as default, _ProjectDetails as ProjectDetails };
