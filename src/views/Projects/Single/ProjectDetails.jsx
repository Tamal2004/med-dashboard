import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Local
import { validateRequired, mapFromValue } from 'libs';
import {
    Select,
    Input,
    IconedButton,
    EditableCard,
    EditableFooter,
    CardDivider
} from 'components';

// Selectors
import {
    selecProjectId,
    selectProjectStatuses,
    selectProjectClients
} from 'selectors';

// Actions
import { listProjectClients, updateProject } from 'actions';

const ProjectDetails = ({
    projectStatuses,
    clients,
    invalid,
    listProjectClients,
    handleSubmit,
    reset
}) => {
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        listProjectClients();
    }, []);

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
            <Input label='Project Cost' name='cost' isCard active={isEditing} />
            <Input
                label='Purchase Order Number'
                name='purchaseOrderNumber'
                isCard
                active={isEditing}
            />
            <CardDivider />
            <Input
                label='Project Manager'
                name='manager'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Tester Facilitator'
                name='testerFacilitator'
                isCard
                active={isEditing}
            />
            <Input
                label='Client Facilitator'
                name='clientFacilitator'
                isCard
                active={isEditing}
            />
            <Input
                label='Main Recruiter'
                name='mainRecruiter'
                isCard
                active={isEditing}
            />
            {isEditing && (
                <EditableFooter
                    onClick={() => {
                        handleSubmit();
                        setEditing(!isEditing);
                    }}
                    disabled={invalid}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => {
    return {
        id: selecProjectId(state),
        clients: selectProjectClients(state),
        projectStatuses: selectProjectStatuses(state),
        initialValues: { reference: 'astarst' }
    };
};

const mapDispatch = { listProjectClients };

const validate = values => {
    const required = [
        'title',
        'reference',
        'client',
        'principalContact',
        'manager'
    ];
    return validateRequired(values, required);
};

const onSubmit = ({ client, ...values }, dispatch, { id }) => {
    const project = {
        id,
        projectClientId: client,
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
