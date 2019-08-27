import React, { useState } from 'react';
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
    Input,
    DateInput,
    CardDivider,
    MultiInput,
    MultiSelect,
    Control
} from 'components';

const ProjectManagement = ({ facilities }) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Project Management'
            onEdit={() => setEditing(!isEditing)}
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
            <Input label='Invoice number' name='invoiceNumber' isCard active={isEditing} />
            {isEditing && (
                <EditableFooter onClick={() => setEditing(!isEditing)} />
            )}
        </EditableCard>
    );
};

const mapState = state => ({
    facilities: [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder'
    ]
});

const mapDispatch = {};

const _ProjectManagement = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectManagement'
    })
)(ProjectManagement);

export {
    _ProjectManagement as default,
    _ProjectManagement as ProjectManagement
};
