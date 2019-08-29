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
import { selectNewProjectStatuses, selectProjectClients, selectProjectUsers } from 'selectors';

// Actions
import { createProject, listProjectClients, listProjectUsers } from 'actions';

const ProjectNew = ({
    projectStatuses,
    clients,
    users,
    invalid,
    pristine,
    reset,
    handleSubmit,
    submitting,
    listProjectClients,
    listProjectUsers
}) => {
    useEffect(() => {
        listProjectClients();
        listProjectUsers();
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
                <Select
                    label='Project Manager'
                    name='manager'
                    data={users}
                    required
                />
                <Select
                    label='Tester Facilitator'
                    name='testerFacilitator'
                    data={users}
                />
                <Select
                    label='Client Facilitator'
                    name='clientFacilitator'
                    data={users}
                />
                <Select
                    label='Main Recruiter'
                    name='mainRecruiter'
                    data={users}
                />
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
    projectStatuses: selectNewProjectStatuses(state),
    clients: selectProjectClients(state),
    users: selectProjectUsers(state),
});

const mapDispatch = { listProjectClients, listProjectUsers };

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
