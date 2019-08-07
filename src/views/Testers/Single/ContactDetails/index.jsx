import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Typography, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RequestIcon from '@material-ui/icons/Autorenew';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import { EditableCard } from '../EditableCard';
import { IconedButton } from '../IconedButton';
import {
    GridContainer,
    GridItem,
    Table,
    Select,
    Input,
    MultiInput,
    Switch
} from 'components';

// Selectors
import {
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

const ContactDetails = ({ hasManualAddress }) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();
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
            <Switch
                label='Enter address manually?'
                name='manualAddress'
                isCard
                active={isEditing}
            />
            {!hasManualAddress && (
                <Input
                    label='Address or postcode'
                    name='age'
                    isCard
                    active={isEditing}
                    required={isEditing}
                />
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
                    />
                    <Input
                        label='Postcode'
                        name='postcode'
                        isCard
                        active={isEditing}
                    />
                </Fragment>
            )}
            <Input
                label='Testing location'
                name='testingLocation'
                isCard
                active={isEditing}
            />
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

const validate = (values, { isStudent, isEmployed, hasManualAddress }) => {
    const required = [
        'title',
        'firstName',
        'surname',
        'email',
        'phone',
        'gender',
        'age',
        'dob',
        'maritalStatus',
        'nationality',
        'ethnicity',
        'selfInfo',
        'employmentStatus'
    ];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');
    if (!hasManualAddress) required.push('address');

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
