import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { change, reduxForm, formValueSelector } from 'redux-form';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

// Local
import { validateRequired } from 'libs';
import { GridItem, Input, EditableCard, EditableFooter } from 'components';

// Selectors
import { selectTesterId } from 'selectors';

// Actions
import { updateTester } from 'actions';

// Normalizers
import { normalizePhone } from 'normalizers';

const useStyles = makeStyles(theme => ({
    manualGrid: {
        textAlign: 'right',
        padding: theme.spacing(2)
    },
    manualLink: {
        paddingLeft: theme.spacing(2)
    }
}));

const ContactDetails = ({
    hasManualAddress,
    invalid,
    change,
    reset,
    handleSubmit,
    submitting
}) => {
    const c = useStyles();
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
            {!hasManualAddress && (
                <Input
                    label='Address or postcode'
                    name='address'
                    isCard
                    active={isEditing}
                    required={isEditing}
                />
            )}
            {isEditing && (
                <GridItem md={12} className={c.manualGrid}>
                    <Link
                        className={c.manualLink}
                        href='#'
                        onClick={() =>
                            change('manualAddress', !hasManualAddress)
                        }
                    >
                        {hasManualAddress ? 'Close' : 'Enter address manually?'}
                    </Link>
                </GridItem>
            )}

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
    hasManualAddress: formValueSelector('ContactDetails')(
        state,
        'manualAddress'
    )
});

const mapDispatch = { change };

const validate = (values, { hasManualAddress }) => {
    const required = ['email', 'phone'];

    if (!hasManualAddress) required.push('address');
    else required.push('country');

    return { ...validateRequired(values, required) };
};

const onSubmit = (
    { email, manualAddress, phone, address, ...values },
    dispatch,
    { id }
) => {
    let addressDetails = {};

    if (manualAddress) {
        addressDetails = {
            address: null,
            ...Object.splice(values, [
                'house',
                'street',
                'town',
                'county',
                'country',
                'postcode'
            ])
        };
    } else {
        addressDetails = {
            address,
            house: null,
            street: null,
            town: null,
            county: null,
            country: null,
            postcode: null
        };
    }

    const tester = {
        id,
        phone,
        ...addressDetails
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
