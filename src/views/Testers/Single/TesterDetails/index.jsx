import React, { useState } from 'react';
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
import {
    GridContainer,
    GridItem,
    Table,
    Select,
    Input,
    MultiInput,
    Switch,
    IconedButton
} from 'components';

// Selectors
import {
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

const TesterDetails = ({
    match,
    genders,
    martitalStatuses,
    nationalities,
    ethnicities
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();
    const title = 'Mr.';
    const firstName = 'Matt';
    const surname = 'Tamal';
    return (
        <EditableCard
            title='Tester Details'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Typography
                className={c.name}
                variant='subtitle1'
            >{`${title} ${firstName} ${surname}`}</Typography>

            <Divider className={c.divider} />
            <Select
                label='Gender'
                name='gender'
                data={genders}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Age'
                name='age'
                type='number'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Date of Birth'
                name='dob'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Marital Status'
                name='maritalStatus'
                data={martitalStatuses}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Switch
                label='Any children?'
                name='hasChildren'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Nationality'
                name='nationality'
                data={nationalities}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Ethnicity'
                name='ethnicity'
                data={ethnicities}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='First Language'
                name='firstLanguage'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Other Languages'
                name='otherLanguages'
                isCard
                active={isEditing}
            />
            <MultiInput
                label='Disability'
                name='disability'
                isCard
                active={isEditing}
            />
            <MultiInput
                label='Screening Information'
                name='selfInfo'
                isCard
                active={isEditing}
            />
            <Divider className={c.divider} />
            <MultiInput
                label='Notes for Clients'
                name='clientNotes'
                isCard
                active={isEditing}
            />
            <MultiInput
                label="Facilitators' Comments"
                name='facilitatorComments'
                isCard
                active={isEditing}
            />
            <Input
                label='Last Updated'
                name='lastUpdated'
                isCard
                active={isEditing}
            />
            <div className={c.footer}>
                <IconedButton
                    color='secondary'
                    onClick={() => console.log('arstarst')}
                    Icon={RequestIcon}
                >
                    Request Update
                </IconedButton>
                <IconedButton
                    onClick={() => console.log('arstarst')}
                    Icon={DeleteIcon}
                >
                    Delete Tester
                </IconedButton>
            </div>
        </EditableCard>
    );
};

const mapState = state => ({
    genders: selectGenders(state),
    martitalStatuses: selectMaritalStatuses(state),
    nationalities: selectNationalities(state),
    ethnicities: selectEthnicities(state)
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

const _TesterDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterDetails',
        validate
    })
)(TesterDetails);

export { _TesterDetails as default, _TesterDetails as TesterDetails };
