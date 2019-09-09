import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// Local
import {
    EditableCard,
    EditableFooter,
    Input,
    DateInput,
    CardDivider,
    MultiInput,
    MultiSelect
} from 'components';

// Selectors
import { selectProjectId, selectFacilities } from 'selectors';

// Actions
import { updateProject } from 'actions';

// Normalizers
import { normalizeNumber } from 'normalizers';

const ProjectManagement = ({
    facilities,
    handleSubmit,
    reset,
    dirty,
    submitting
}) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Project Management'
            onEdit={() => {
                if (isEditing) reset();
                setEditing(!isEditing);
            }}
            isEditing={isEditing}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <MultiSelect
                data={facilities}
                name='facilities'
                label='Facilities booked'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Tester screener approved'
                name='screenerApproved'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Facilitation guide sent'
                name='facilitationGuideSent'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Tester profiles sent'
                name='testerProfilesSent'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Facilitation guide approved'
                name='facilitationGuideApproved'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Tester profiles approved'
                name='testerProfilesApproved'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Session details sent'
                name='sessionDetailsSent'
                isCard
                active={isEditing}
            />
            <MultiInput
                label='Attendees confirmed'
                name='attendees'
                isCard
                active={isEditing}
            />
            <CardDivider />
            <DateInput
                label='Report sent'
                name='reportSent'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Feedback on testers entered'
                name='feedbackEntered'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Videos uploaded'
                name='videosUploaded'
                isCard
                active={isEditing}
            />
            <DateInput
                label='Invoiced'
                name='invoiced'
                isCard
                active={isEditing}
            />
            <Input
                label='Invoice number'
                name='invoiceNumber'
                isCard
                normalize={normalizeNumber}
                active={isEditing}
            />
            {isEditing && (
                <EditableFooter
                    onClick={() => {
                        if (isEditing && dirty) handleSubmit();
                        setEditing(!isEditing);
                    }}
                    disabled={submitting}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => ({
    id: selectProjectId(state),
    facilities: selectFacilities(state)
});

const _ProjectManagement = compose(
    connect(mapState),
    reduxForm({
        form: 'ProjectManagement',
        onSubmit: (values, dispatch, { id }) =>
            dispatch(updateProject({ id, ...values }))
    })
)(ProjectManagement);

export {
    _ProjectManagement as default,
    _ProjectManagement as ProjectManagement
};
