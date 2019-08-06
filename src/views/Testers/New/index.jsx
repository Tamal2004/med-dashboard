import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Paper, Typography } from '@material-ui/core';

// Local
import useStyles from './styles';
import { SelectBase, Container, Select, Input, MultiInput } from 'components';

const employmentDataset = [
    { label: 'Unemployed', value: 0 },
    { label: 'Full-time Employment', value: 1 },
    { label: 'Part-time Employment', value: 2 },
    { label: 'Retired', value: 3 },
    { label: 'Student', value: 4 }
];

const TesterApplication = props => {
    const c = useStyles();
    const employment = 4;

    const isStudent = employment === 4;

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
                    data={[]}
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
                    data={[]}
                    name='country'
                    placeholder='Please select...'
                    required
                />
                <Select
                    label='Country'
                    data={[]}
                    name='country'
                    placeholder='Please select...'
                    required
                />
                <Input label='Postcode' data={[]} name='postcode' required />
            </Container>

            <Container title='Personal Details'>
                <Select
                    label='Gender'
                    data={[]}
                    name='gender'
                    placeholder='Please select...'
                    required
                />
                <Input label='Age' name='age' required type='number' />
                <Input label='Date of Birth' name='dob' required />
                <Select
                    label='Marital Status'
                    data={[]}
                    name='marital'
                    placeholder='Please select...'
                    required
                />
                <Select
                    label='Ethnicity'
                    data={[]}
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
                    placeholder={`Please include information about your interests, experience, previous jobs, areas of expertise and anything else that might help us match you with relevant projects.`}
                />
            </Container>
            <Container title='Employment Details'>
                <Select
                    label='Employment Status'
                    data={employmentDataset}
                    name='employment'
                    placeholder='Please select...'
                    required
                />
                {true && (
                    <Fragment>
                        <Input label='Job Title' name='jobTitle' />
                        <Input label='Business Name' name='businessName' />
                        <Select
                            label='Sector'
                            data={[]}
                            name='sector'
                            placeholder='Please select...'
                        />
                        <Select
                            label='Number of employees'
                            data={[]}
                            name='employeeCount'
                            placeholder='Please select...'
                            required
                        />
                    </Fragment>
                )}
                {employment === 4 && (
                    <Fragment>
                        <Input label='Subject Area' name='subject' required />
                        <Select
                            label='Stage'
                            data={[]}
                            name='stage'
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
            <Container title='Employment Details'>
                <Select
                    label='Employment Status'
                    data={employmentDataset}
                    name='employment'
                    placeholder='Please select...'
                    required
                />
                {true && (
                    <Fragment>
                        <Input label='Job Title' name='jobTitle' />
                        <Input label='Business Name' name='businessName' />
                        <Select
                            label='Sector'
                            data={[]}
                            name='sector'
                            placeholder='Please select...'
                        />
                        <Select
                            label='Number of employees'
                            data={[]}
                            name='employeeCount'
                            placeholder='Please select...'
                            required
                        />
                    </Fragment>
                )}
            </Container>
        </Paper>
    );
};

const mapState = state => ({});

const mapDispatch = {};

const _TesterApplication = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterApplication'
    })
)(TesterApplication);

export { _TesterApplication as default, _TesterApplication as TesterNew };
