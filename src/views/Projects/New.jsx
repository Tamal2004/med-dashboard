import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import API, { graphqlOperation } from '@aws-amplify/api';

// Material
import { Paper, Typography, Grid, makeStyles } from '@material-ui/core';

// Local
import { validateRequired } from 'libs';
import { Container, Select, Input, NavigateButton } from 'components';

// Selectors
import { selectProjectStatuses, selectProjectClients } from 'selectors';

// Actions
import { createProject, fetchProjectClients } from 'actions';

// Styles
const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        width: '100%'
    },
    header: {
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    footer: {
        padding: spacing(3)
    },
    submit: {
        width: `calc(100% - ${spacing(6)}px)`,
        height: spacing(6),
        marginLeft: spacing(3),
        marginRight: spacing(3)
    }
}));






const ProjectNew = ({ projectStatuses, clients, invalid, pristine, reset, handleSubmit, submitting, fetchProjectClients }) => {
    useEffect(() => {
        fetchProjectClients()
    });
    const c = useStyles();

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h2' gutterBottom>
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
                <Select label='Client' data={clients} name='projectClientId' required />
                <Input
                    label='Principal Contact'
                    name='principalContact'
                    required
                />
                <Input label='Other Contact' name='otherContact' />
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

const mapDispatch = { createProject, fetchProjectClients };

const validate = values => {
    const required = [
        'reference',
        'title',
        'projectClientId',
        'principalContact',
        'manager'
    ];

    return { ...validateRequired(values, required) };
};

const onSubmit = async (values, dispatch, { createProject }) => {
    const project = { ...values, createdAt: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')};
    return createProject(project);
};


const _ProjectNew = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectNew',
        validate,
        onSubmit
    })
)(ProjectNew);

export { _ProjectNew as default, _ProjectNew as ProjectNew };
