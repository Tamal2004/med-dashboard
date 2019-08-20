import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import API, { graphqlOperation } from "@aws-amplify/api";

// Material
import { Paper, Typography, Grid, makeStyles } from '@material-ui/core';

// Local
import { validateRequired } from 'libs';
import { Container, Select, Input, NavigateButton } from 'components';
//import { createTask } from 'graphql/mutations';

// Selectors
import { selectProjectStatuses } from 'selectors';

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

// async function createNewTask() {
//     const task = {
//         title: 'First Task',
//         description: 'Realtime and Offline',
//         status: 'testing'
//     };
//     const res = await API.graphql(
//         graphqlOperation(createTask, { input: task })
//     );
//     console.log(res);
// }

const ProjectNew = ({ projectStatuses, clients, invalid, pristine, reset }) => {
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
                <Select label='Client' data={clients} name='client' required />
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
                        //onClick={createNewTask}
                        disabled={invalid}
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
    //clients: selectNationalities(state),
    clients: []
});

const mapDispatch = {};

const validate = values => {
    const required = ['reference', 'title', 'client', 'principalContact'];

    return { ...validateRequired(values, required) };
};

const _ProjectNew = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectNew',
        validate
    })
)(ProjectNew);

export { _ProjectNew as default, _ProjectNew as ProjectNew };
