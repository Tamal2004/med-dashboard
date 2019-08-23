import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Paper, Typography, Grid } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validate, asyncValidate } from './validate';

// Components
import {
    Container,
    Select,
    Input,
    NavigateButton,
    DateInput
} from 'components';

// Selectors
import { selectProjectStatuses, selectProjectClients } from 'selectors';

// Actions
import { createProject, fetchProjectClients } from 'actions';

const ProjectNew = ({
    projectStatuses,
    clients,
    invalid,
    pristine,
    reset,
    handleSubmit,
    submitting,
    fetchProjectClients
}) => {
    useEffect(() => {
        fetchProjectClients();
    }, []);
    const c = useStyles();

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h4' gutterBottom>
                New Project Form
            </Typography>
            <Container title='Project Details'>
                <Input label='Project Reference' name='reference' required />
                <Input label='Project Title' name='title' required />
                <Select
                    label='Project Status'
                    data={projectStatuses}
                    name='status'
                />
                <Select
                    label='Client'
                    data={clients}
                    name='projectClientId'
                    required
                />
                <Input
                    label='Principal Contact'
                    name='principalContact'
                    required
                />
                <Input label='Other Contact' name='otherContact' />
                <DateInput
                    label='Observed Testing Date'
                    name='testingDate'
                    required
                />
                <Input label='Project Cost' name='cost' />
                <Input
                    label='Purchase Order Number'
                    name='purchaseOrderNumber'
                />
                <Input label='Project Manager' name='manager' required />
                <Input label='Tester Facilitator' name='testerFacilitator' />
                <Input label='Client Facilitator' name='clientFacilitator' />
                <Input label='Main Recruiter' name='mainRecruiter' />
            </Container>
            <Grid container className={c.footer}>
                <Grid item xs={6}>
                    <NavigateButton
                        className={c.submit}
                        variant='contained'
                        color='secondary'
                        onClick={reset}
                        disabled={pristine}
                    >
                        Reset
                    </NavigateButton>
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

const mapState = state => ({
    projectStatuses: selectProjectStatuses(state),
    clients: selectProjectClients(state)
});

const mapDispatch = { fetchProjectClients };

const _ProjectNew = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectNew',
        validate,
        asyncValidate,
        asyncBlurFields: ['reference'],
        onSubmit: async (values, dispatch) => dispatch(createProject(values))
    })
)(ProjectNew);

export { _ProjectNew as default, _ProjectNew as ProjectNew };
