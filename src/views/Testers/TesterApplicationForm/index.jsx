import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Paper, Typography, Grid, Link } from '@material-ui/core';

// Local
import useStyles from './styles';
import onSubmit from './onSubmit';
import { validate, asyncValidate } from './validate';

// Libs
import { validateEmail, validateDate, validateNumber } from 'libs';

// Components
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
    selectIsTester,
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

// Normalizers
import { normalizeDob } from 'normalizers';

const TesterApplication = ({
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
    invalid,
    handleSubmit,
    submitting,
    isTester
}) => {
    const c = useStyles();
    return (
        <Paper className={c.root}>
            {isTester && (
                <Fragment>
                    <Typography className={c.header} variant='h4' gutterBottom>
                        Tester Application Form
                    </Typography>
                    <Typography
                        className={c.info}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Thank you for your interest in becoming a website
                        tester. So we can match you with the most suitable
                        testing opportunities please fill out the form below
                        with as much information as possible.
                    </Typography>
                    <Typography
                        className={c.info}
                        variant='subtitle1'
                        gutterBottom
                    >
                        If you have any queries, please contact Avril on
                        avril@webusability.co.uk.
                    </Typography>
                    <Typography
                        className={c.info}
                        variant='subtitle1'
                        gutterBottom
                    >
                        Our database is maintained solely for our use in
                        recruiting testers. The information is not passed on to
                        any other organisation.
                    </Typography>
                </Fragment>
            )}
            <Container title='Contact Details'>
                <Select label='Title' data={titles} name='title' required />
                <Input label='First Name' name='firstName' required />
                <Input label='Surname' name='surname' required />
                <Input
                    label='Email Address'
                    name='email'
                    validate={validateEmail}
                    required
                />
                <Input
                    label='Phone Number'
                    name='phone'
                    required
                    validate={validateNumber}
                />
                {!hasManualAddress && (
                    <Input
                        label='Enter address or postcode'
                        name='address'
                        required
                    />
                )}
                <Switch label='Enter address manually?' name='manualAddress' />
                {hasManualAddress && (
                    <Fragment>
                        <Input label='House name or number' name='house' />
                        <Input label='Street' name='street' />
                        <Input label='Town' name='town' />
                        <Input label='County' name='county' />
                        <Input label='Postcode' name='postcode' />
                        <Input label='Country' name='country' required />
                    </Fragment>
                )}
            </Container>

            <Container title='Personal Details'>
                <Select label='Gender' data={genders} name='gender' required />
                <Input
                    label='Date of Birth'
                    placeholder='31/12/1999'
                    name='dob'
                    required
                    validate={validateDate}
                    normalize={normalizeDob}
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
                    label='Ethnic Background'
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
                    memo={
                        `Please describe any disability you have and, if relevant, ` +
                        `the assistive technology you use (e.g. screen reader, screen magnifier).`
                    }
                />
                <MultiInput
                    label='Tell us a bit about yourself'
                    name='about'
                    required
                    memo={
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
                    {isTester && (
                        <Grid container>
                            <Grid item xs={2}>
                                <CheckboxBase
                                    name='termsChecked'
                                    color='primary'
                                />
                            </Grid>

                            <Grid item xs={10}>
                                <Typography>
                                    I confirm that I have read and accepted the
                                    Testers{' '}
                                    <Link href='#'>Terms & Conditions</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <NavigateButton
                        className={c.submit}
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        disabled={invalid || submitting}
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
        isTester: selectIsTester(state),
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
        isStudent: employmentStatus === 'Student',
        isEmployed:
            employmentStatus === 'Part-time employment' ||
            employmentStatus === 'Full-time employment' ||
            employmentStatus === 'Retired',
        isRetired: employmentStatus === 'Retired',
        hasManualAddress: formSelector(state, 'manualAddress'),
        initialValues: {
            manualAddress: true,
            title: 'Mr',
            firstName: 'Matt',
            surname: 'Tamal',
            email: 'matt@echotechsys.com',
            phone: '01306568988',
            address: 'Avenue Adolphe Buyl 12 1050 Ixelles',
            house: '12',
            street: 'Avenue Adolphe',
            town: 'Brussels',
            county: 'Yorkshire',
            postcode: '1050',
            country: 'Belgium',
            gender: 'Male',
            dob: '01/01/1999',
            maritalStatus: 'Single',
            hasChildren: true,
            nationality: 'United Kingdom',
            ethnicity: 'Arab',
            firstLanguage: 'English',
            otherLanguages: 'Bengali',
            disability: 'None',
            about: 'Software developer',
            employmentStatus: 'Full-time employment',
            jobTitle: 'Software Engineer',
            businessName: 'Matt Tamal',
            employmentSector: 'Computers & ICT',
            employeeCount: '1 - 9',
            subject: 'Medicine',
            educationStage: 'University',
            institution: 'Cambridge University',
            termsChecked: true
        }
    };
};

const _TesterApplication = compose(
    connect(mapState),
    reduxForm({
        form: 'TesterApplication',
        validate,
        asyncValidate,
        asyncBlurFields: ['email'],
        onSubmit
    })
)(TesterApplication);

export {
    _TesterApplication as default,
    _TesterApplication as TesterApplication
};
