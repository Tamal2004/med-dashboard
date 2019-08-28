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
    Control,
    MultiInput
} from 'components';

// Selectors
import { selectProjectId } from 'selectors';

// Actions
import { updateProject } from 'actions';

const ClientFeedback = ({ invalid, handleSubmit, reset }) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Client Feedback'
            onEdit={() => {
                reset();
                setEditing(!isEditing);
            }}
            isEditing={isEditing}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Control label='Client Comments' isCard />
            <MultiInput name='clientComments' isCard active={isEditing} />
            <Control label='Web Usability Comments' isCard />
            <MultiInput name='wuComments' isCard active={isEditing} />
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

const mapState = state => ({ id: selectProjectId(state) });

const mapDispatch = {};

const onSubmit = (values, dispatch, { id }) =>
    dispatch(updateProject({ id, ...values }));

const _ClientFeedback = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ClientFeedback',
        onSubmit
    })
)(ClientFeedback);

export { _ClientFeedback as default, _ClientFeedback as ClientFeedback };
