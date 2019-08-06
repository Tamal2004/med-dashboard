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
    selectCountries,
    selectEducationStages,
    selectEmployeeCounts,
    selectEmploymentSectors,
    selectEmploymentStatuses,
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectTitles
} from 'selectors';

const TesterApplication = ({
    counties,
    countries,
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
    invalid
}) => {
    const c = useStyles();

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h2' gutterBottom>
                Tester Application Form
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                If you would like to be a tester plase read the Tester Terms &
                Conditions, and complete the form below.
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                Our database is maintained solely for our use in recruiting
                testers. The information is not passed onto any other
                organisation.
            </Typography>
            <Typography className={c.info} variant='h5' gutterBottom>
                Remember, the more information you give us, the more change we
                will recruit you.
            </Typography>
            <Container title='Contact Details'>
                <Select
                    label='Title'
                    data={titles}
                    name='title'
                    placeholder='Please select...'
                    required
                />
                <Input label='First Name' name='firstName' required />
                <Input label='Surname' name='surname' required />
                <Input label='Preferred Email Address' name='email' required />
                <Input
                    label='Alternative Email Address'
                    name='emailAlternative'
                    required
                />
                <Input label='Preferred Phone Number' name='phone' required />
                <Input label='Town' name='town' required />
                <Select
                    label='County'
                    data={counties}
                    name='county'
                    placeholder='Please select...'
                    required
                />
                <Select
                    label='Country'
                    data={countries}
                    name='country'
                    placeholder='Please select...'
                    required
                />
                <Input label='Postcode' data={[]} name='postcode' required />
            </Container>

            <Container title='Personal Details'>
                <Select
                    label='Gender'
                    data={genders}
                    name='gender'
                    placeholder='Please select...'
                    required
                />
                <Input label='Age' name='age' required type='number' />
                <Input label='Date of Birth' name='dob' required />
                <Select
                    label='Marital Status'
                    data={maritalStatuses}
                    name='maritalStatus'
                    placeholder='Please select...'
                    required
                />
                <Switch label='Do you have children?' name='hasChildren' required/>
                <Select
                    label='Ethnicity'
                    data={ethnicities}
                    name='ethnicity'
                    placeholder='Please select...'
                    required
                />
                <Input
                    label='Disability'
                    name='disability'
                    placeholder='Please describe any disability you have.'
                />
                <MultiInput
                    label='Information about yourself'
                    name='selfInfo'
                    multiline
                    rows={8}
                    rowsMax={8}
                    required
                    placeholder={`Please include information about your interests, experience, previous jobs, areas of expertise and anything else that might help us match you with relevant projects.`}
                />
            </Container>
            <Container title='Employment Details'>
                <Select
                    label='Employment Status'
                    data={employmentStatuses}
                    name='employmentStatus'
                    placeholder='Please select...'
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
                            placeholder='Please select...'
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
                            placeholder='Please select...'
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
    const employmentStatus = formValueSelector('TesterApplication')(
        state,
        'employmentStatus'
    );
    return {
        counties: selectCounties(state),
        countries: selectCountries(state),
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
        isRetired: employmentStatus === 4
    };
};

const mapDispatch = {};

const validate = (values, { isStudent, isEmployed }) => {
    const required = [
        'title',
        'firstName',
        'surname',
        'email',
        'emailAlternative',
        'phone',
        'town',
        'county',
        'country',
        'postcode',
        'gender',
        'age',
        'dob',
        'maritalStatus',
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
