import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Local
import { validateRequired } from 'libs';
import {
    Input,
    Switch,
    IconedButton,
    EditableCard,
    EditableFooter
} from 'components';

const ContactDetails = ({ hasManualAddress }) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Contact Details'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Input
                label='Email address'
                name='email'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Phone number'
                name='phone'
                isCard
                active={isEditing}
                required={isEditing}
            />
            {!hasManualAddress && (
                <Input
                    label='Address or postcode'
                    name='address'
                    isCard
                    active={isEditing}
                    required={isEditing}
                />
            )}
            <Switch
                label='Enter address manually?'
                name='manualAddress'
                isCard
                active={isEditing}
            />
            {hasManualAddress && (
                <Fragment>
                    <Input
                        label='House name or number'
                        name='house'
                        isCard
                        active={isEditing}
                    />
                    <Input
                        label='Street'
                        name='street'
                        isCard
                        active={isEditing}
                    />
                    <Input label='Town' name='town' isCard active={isEditing} />
                    <Input
                        label='County'
                        name='county'
                        isCard
                        active={isEditing}
                    />
                    <Input
                        label='Country'
                        name='country'
                        isCard
                        active={isEditing}
                        required={isEditing}
                    />
                    <Input
                        label='Postcode'
                        name='postcode'
                        isCard
                        active={isEditing}
                    />
                </Fragment>
            )}
            {isEditing && (
                <EditableFooter onClick={() => setEditing(!isEditing)} />
            )}
        </EditableCard>
    );
};

const mapState = state => ({
    hasManualAddress: formValueSelector('ContactDetails')(
        state,
        'manualAddress'
    )
});

const mapDispatch = {};

const validate = (values, { hasManualAddress }) => {
    const required = ['email', 'phone'];

    if (!hasManualAddress) required.push('address');
    else required.push('country');

    return { ...validateRequired(values, required) };
};

const _ContactDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ContactDetails',
        validate
    })
)(ContactDetails);

export { _ContactDetails as default, _ContactDetails as ContactDetails };
