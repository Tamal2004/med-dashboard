import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Paper, Typography, Grid } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
    SelectBase,
    Container,
    Select,
    Input,
    MultiInput,
    CheckboxBase,
    Switch,
    NavigateButton
} from 'components';

// Selectors
import {
    selectCounties,
    selectEducationStages,
    selectEmployeeCounts,
    selectEmploymentSectors,
    selectEmploymentStatuses,
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

const TesterApplication = ({
    counties,
    nationalities,
    educationStages,
    employeeCounts,
    employmentSectors,
    employmentStatuses,
    ethnicities,
    genders,
    maritalStatuses,
    titles,
    isStudent,
    isEmployed,
    isRetired,
    hasManualAddress,
    invalid
}) => {
    const c = useStyles();

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h2' gutterBottom>
                Tester Application Form
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                Thank you for your interest in becoming a website tester. So we
                can match you with the most suitable testing opportunities
                please fill out the form below with as much information as
                possible.
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                If you have any queries, please contact Avril on
                avril@webusability.co.uk.
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                Our database is maintained solely for our use in recruiting
                testers. The information is not passed onto to any other
                organisation.
            </Typography>
            <Container title='Contact Details'>
                <Select label='Title' data={titles} name='title' required />
                <Input label='First Name' name='firstName' required />
                <Input label='Surname' name='surname' required />
                <Input label='Email Address' name='email' required />
                <Input label='Phone Number' name='phone' required />
                <Switch label='Enter address manually?' name='manualAddress' />
                {!hasManualAddress && (
                    <Input
                        label='Enter address or postcode'
                        name='address'
                        required
                    />
                )}
                {hasManualAddress && (
                    <Fragment>
                        <Input label='House name or number' name='house' />
                        <Input label='Street' name='street' />
                        <Input label='Town' name='town' />
                        <Input label='County' name='county' />
                        <Input label='Postcode' name='postcode' />
                        <Input label='Country' name='country' />
                    </Fragment>
                )}
            </Container>

            <Container title='Personal Details'>
                <Select label='Gender' data={genders} name='gender' required />
                <Input label='Age' name='age' required type='number' />
                <Input
                    label='Date of Birth'
                    placeholder='01/01/1985'
                    name='dob'
                    required
                />
                <Select
                    label='Marital Status'
                    data={maritalStatuses}
                    name='maritalStatus'
                    required
                />
                <Switch
                    label='Do you have children?'
                    name='hasChildren'
                    required
                />
                <Select
                    label='Nationality'
                    name='nationality'
                    data={nationalities}
                    required
                />
                <Select
                    label='Ethnicity'
                    data={ethnicities}
                    name='ethnicity'
                    required
                />
                <Input
                    label='What is your first language?'
                    name='firstLanguage'
                    required
                />
                <Input label='Other languages spoken' name='otherLanguages' />
                <MultiInput
                    label='Disability'
                    name='disability'
                    placeholder={
                        `Please describe any disability you have and, if relevant, ` +
                        `the assistive technology you use (e.g. screen reader, screen magnifier).`
                    }
                />
                <MultiInput
                    label='Tell us a bit about yourself'
                    name='selfInfo'
                    required
                    placeholder={
                        `Please include information about your family, hobbies, interests, ` +
                        `experiences, previous jobs, areas of expertise or anything else that ` +
                        `might help us match you to relevant projects.`
                    }
                />
            </Container>
            <Container title='Employment Details'>
                <Select
                    label='Employment Status'
                    data={employmentStatuses}
                    name='employmentStatus'
                    required
                />
                {isEmployed && (
                    <Fragment>
                        <Input
                            label={`${isRetired ? 'Last ' : ''}Job Title`}
                            name='jobTitle'
                        />
                        <Input
                            label={`${isRetired ? 'Last ' : ''}Business Name`}
                            name='businessName'
                        />
                        <Select
                            label={`${isRetired ? "Last Job's " : ''}Sector`}
                            data={employmentSectors}
                            name='employmentSector'
                            placeholder='Please select...'
                        />
                        <Select
                            label={`${
                                isRetired ? "Last Job's " : ''
                            }Number of Employees`}
                            data={employeeCounts}
                            name='employeeCount'
                            required
                        />
                    </Fragment>
                )}
                {isStudent && (
                    <Fragment>
                        <Input label='Subject Area' name='subject' required />
                        <Select
                            label='Stage'
                            data={educationStages}
                            name='educationStage'
                            required
                        />
                        <Input
                            label='Institution'
                            name='institution'
                            required
                        />
                    </Fragment>
                )}
            </Container>
            <Grid container className={c.footer}>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={2}>
                            <CheckboxBase name='termsChecked' color='primary' />
                        </Grid>

                        <Grid item xs={10}>
                            <Typography>
                                I confirm that I have read and accepted the
                                Testers Terms & Conditions
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <NavigateButton
                        className={c.submit}
                        variant='contained'
                        color='primary'
                        onClick={() => console.log('submitted')}
                        disabled={invalid}
                    >
                        Submit
                    </NavigateButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

const mapState = state => {
    const formSelector = formValueSelector('TesterApplication');
    const employmentStatus = formSelector(state, 'employmentStatus');
    return {
        counties: selectCounties(state),
        nationalities: selectNationalities(state),
        educationStages: selectEducationStages(state),
        employeeCounts: selectEmployeeCounts(state),
        employmentSectors: selectEmploymentSectors(state),
        employmentStatuses: selectEmploymentStatuses(state),
        ethnicities: selectEthnicities(state),
        genders: selectGenders(state),
        maritalStatuses: selectMaritalStatuses(state),
        titles: selectTitles(state),
        isStudent: employmentStatus === 5,
        isEmployed:
            employmentStatus === 2 ||
            employmentStatus === 3 ||
            employmentStatus === 4,
        isRetired: employmentStatus === 4,
        hasManualAddress: formSelector(state, 'manualAddress')
    };
};

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

const _TesterApplication = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterApplication',
        validate
    })
)(TesterApplication);

export { _TesterApplication as default, _TesterApplication as TesterNew };
