import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Grid, Typography, Divider, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RequestIcon from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';

// Local
import { validateRequired, mapFromValue } from 'libs';
import {
    Select,
    Input,
    MultiInput,
    Switch,
    IconedButton,
    EditableCard
} from 'components';

// Selectors
import {
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    name: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        lineHeight: `${spacing(4)}px`,
        fontWeight: typography.fontWeightHeavy
    },
    divider: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    },
    footer: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const TesterDetails = ({
    match,
    titles,
    genders,
    martitalStatuses,
    nationalities,
    ethnicities,
    invalid,
    title,
    firstName,
    surname
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();

    return (
        <EditableCard
            title='Tester Details'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            {isEditing ? (
                <Grid container>
                    <Grid item xs={4}>
                        <Select
                            name='title'
                            placeholder='Title'
                            data={titles}
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            name='firstName'
                            placeholder='First Name'
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            name='surname'
                            placeholder='Surname'
                            isCard
                            active={isEditing}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Typography
                    className={c.name}
                    variant='h6'
                >{`${title} ${firstName} ${surname}`}</Typography>
            )}
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
                required={isEditing}
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
            <Divider className={c.divider} />
            <div className={c.footer}>
                <IconedButton
                    color='secondary'
                    onClick={() => console.log('arstarst')}
                    Icon={RequestIcon}
                >
                    Request Update
                </IconedButton>
                {isEditing ? (
                    <IconedButton
                        Icon={EditIcon}
                        onClick={() => setEditing(!isEditing)}
                        disabled={invalid}
                    >
                        Save Edits
                    </IconedButton>
                ) : (
                    <IconedButton
                        onClick={() => console.log('arstarst')}
                        Icon={DeleteIcon}
                    >
                        Delete Tester
                    </IconedButton>
                )}
            </div>
        </EditableCard>
    );
};

TesterDetails.defaultProps = {
    title: 'Dr.',
    firstName: 'John',
    surname: 'Smith'
};

const mapState = state => {
    const formSelector = formValueSelector('TesterDetails');
    const titles = selectTitles(state);
    return {
        titles,
        genders: selectGenders(state),
        martitalStatuses: selectMaritalStatuses(state),
        nationalities: selectNationalities(state),
        ethnicities: selectEthnicities(state),
        initialValues: {
            hasChildren: false,
            title: 1,
            firstName: 'Matt',
            surname: 'Tamal'
        },
        title: mapFromValue(titles, formSelector(state, 'title')),
        firstName: formSelector(state, 'firstName'),
        surname: formSelector(state, 'surname')
    };
};

const mapDispatch = {};

const validate = values => {
    const required = [
        'title',
        'firstName',
        'surname',
        'gender',
        'age',
        'dob',
        'maritalStatus',
        'hasChildren',
        'nationality',
        'ethnicity',
        'firstLanguage',
        'selfInfo'
    ];
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
