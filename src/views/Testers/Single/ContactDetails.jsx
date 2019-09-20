import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { change, reduxForm, formValueSelector } from 'redux-form';
// Local
import { validateRequired } from 'libs';
import { Input, EditableCard, EditableFooter, Select } from 'components';

// Selectors
import { selectTesterId, selectCountries } from 'selectors';

// Actions
import { updateTester } from 'actions';

// Normalizers
import { normalizePhone } from 'normalizers';

const ContactDetails = ({
    countries,
    invalid,
    change,
    reset,
    handleSubmit,
    submitting
}) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Contact Details'
            isEditing={isEditing}
            onEdit={() => {
                if (isEditing) reset();
                setEditing(!isEditing);
            }}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Input
                label='Email address'
                name='email'
                isCard
                active={false}
                required={isEditing}
            />
            <Input
                label='Phone number'
                name='phone'
                normalize={normalizePhone}
                isCard
                active={isEditing}
                required={isEditing}
            />

            <Input
                label='House name or number'
                name='house'
                isCard
                active={isEditing}
            />
            <Input label='Street' name='street' isCard active={isEditing} />
            <Input
                label='Town'
                name='town'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input label='County' name='county' isCard active={isEditing} />
            <Select
                label='Country'
                name='country'
                data={countries}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input label='Postcode' name='postcode' isCard active={isEditing} />
            {isEditing && (
                <EditableFooter
                    onClick={() => {
                        if (isEditing) handleSubmit();
                        setEditing(!isEditing);
                    }}
                    disabled={invalid || submitting}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => ({
    id: selectTesterId(state),
    countries: selectCountries(state),
    hasManualAddress: formValueSelector('ContactDetails')(
        state,
        'manualAddress'
    )
});

const mapDispatch = { change };

const validate = values => {
    const required = ['email', 'phone', 'town', 'country'];

    return { ...validateRequired(values, required) };
};

const onSubmit = ({ email, ...values }, dispatch, { id }) => {
    const tester = {
        id,
        ...values
    };

    return dispatch(updateTester(tester));
};

const _ContactDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ContactDetails',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        validate,
        onSubmit
    })
)(ContactDetails);

export { _ContactDetails as default, _ContactDetails as ContactDetails };
