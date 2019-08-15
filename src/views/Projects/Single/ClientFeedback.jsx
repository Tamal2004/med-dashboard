import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Local
import { validateRequired } from 'libs';
import {
    Input,
    EditableCard,
    EditableFooter,
    DateInput,
    Control,
    MultiInput
} from 'components';

// Selectors
import {} from 'selectors';

const ClientFeedback = ({ invalid }) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Client Feedback'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <DateInput label='Feedback obtained' name='feedbackDate' isCard active={isEditing} />
            <Input
                label='Satisfaction Score'
                name='satisfaction'
                isCard
                active={isEditing}
                type='number'
            />
            <Control label='Client Comments' isCard />
            <MultiInput name='clientComments' isCard active={isEditing} />
            <Control label='Web Usability Comments' isCard />
            <MultiInput name='wuComments' isCard active={isEditing} />
            {isEditing && (
                <EditableFooter
                    onClick={() => setEditing(!isEditing)}
                    disabled={invalid}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => ({});

const mapDispatch = {};

const validate = (values, { isStudent, isEmployed }) => {
    const required = ['employmentStatus'];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');

    return { ...validateRequired(values, required) };
};

const _ClientFeedback = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ClientFeedback',
        validate
    })
)(ClientFeedback);

export { _ClientFeedback as default, _ClientFeedback as ClientFeedback };
