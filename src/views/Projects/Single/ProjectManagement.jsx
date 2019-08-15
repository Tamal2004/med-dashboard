import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Local
import { validateRequired } from 'libs';
import {
    Select,
    IconedButton,
    EditableCard,
    EditableFooter,
    DateInput,
    CardDivider,
    MultiInput
} from 'components';

const ProjectManagement = () => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Project Management'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Select
                label='Facilities booked'
                name='facility'
                data={[]}
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
            {isEditing && (
                <EditableFooter onClick={() => setEditing(!isEditing)} />
            )}
        </EditableCard>
    );
};

const mapState = state => ({});

const mapDispatch = {};

const validate = (values, { hasManualAddress }) => {
    const required = ['email', 'phone'];

    if (!hasManualAddress) required.push('address');
    else required.push('country');

    return { ...validateRequired(values, required) };
};

const _ProjectManagement = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectManagement',
        validate
    })
)(ProjectManagement);

export {
    _ProjectManagement as default,
    _ProjectManagement as ProjectManagement
};
