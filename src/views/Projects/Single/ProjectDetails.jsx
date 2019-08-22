import React, { useState } from 'react';
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
import { selectProjectStatuses } from 'selectors';

const ProjectDetails = ({ projectStatuses, clients, invalid }) => {
    const [isEditing, setEditing] = useState(false);

    return (
        <EditableCard
            title='Project Details'
            onEdit={() => setEditing(!isEditing)}
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
                    onClick={() => setEditing(!isEditing)}
                    disabled={invalid}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => {
    return {
        // clients: selectClients(state),
        clients: selectProjectStatuses(state),
        projectStatuses: selectProjectStatuses(state),
        initialValues: { reference: 'astarst' }
    };
};

const mapDispatch = {};

const validate = values => {
    const required = ['title', 'reference', 'client', 'principalContact', 'manager'];
    return validateRequired(values, required);
};

const _ProjectDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectDetails',
        validate
    })
)(ProjectDetails);

export { _ProjectDetails as default, _ProjectDetails as ProjectDetails };
