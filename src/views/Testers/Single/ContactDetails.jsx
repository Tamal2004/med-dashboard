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
            <Input
                label='Country'
                name='country'
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

const onSubmit = (
    { email, ...values },
    dispatch,
    { id }
) => {
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
