import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, updateSyncErrors } from 'redux-form';

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { NavigateButton, Input, Container } from 'components';

//Local
import { resetTester } from 'actions';
import { validateEmail, validateRequired } from 'libs';

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        margin: spacing(4),
        padding: spacing(4),
        textAlign: 'justify',
        width: 'auto'
    },
    header: {
        fontWeight: 700,
        textAlign: 'center',
        paddingTop: spacing(2),
        paddingBottom: spacing(4)
    },
    info: {
        padding: spacing(3)
    },
    footer: {
        padding: spacing(3)
    },
    accountContainer: {
        marginRight: spacing(),
        marginLeft: spacing(4)
    },
    passwordContainer: {
        marginRight: spacing(6),
        marginLeft: spacing(-1.5)
    },
    button: {
        width: `calc(100% + ${spacing(2)}px)`,
        height: spacing(6)
    }
}));

const AdminHome = ({ handleSubmit, invalid }) => {
    const c = useStyles();

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h4' gutterBottom>
                Tester Admin Manager
            </Typography>
            <Typography className={c.info} variant='subtitle1' gutterBottom>
                Enter any valid email address, and the account will be reset.
                This can be used for resetting their temporary password and/or
                resetting the account. They will be sent an initial invitation
                email. NOTE: The email is case-sensitive; best to search the
                tester record first.
            </Typography>
            <Container>
                <Input
                    name='email'
                    label='Email Address'
                    validate={validateEmail}
                    required
                />
                <Grid container className={c.footer}>
                    <Grid item xs={12} sm={6}>
                        <NavigateButton
                            styles={{
                                root: c.button,
                                container: c.passwordContainer
                            }}
                            onClick={async ({ setLoading }) =>
                                await handleSubmit()(setLoading)
                            }
                            enableLoader
                            color='secondary'
                            disabled={invalid}
                        >
                            Reset Password
                        </NavigateButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <NavigateButton
                            styles={{
                                root: c.button,
                                container: c.accountContainer
                            }}
                            onClick={async ({ setLoading }) =>
                                await handleSubmit()(setLoading)
                            }
                            enableLoader
                            disabled={invalid}
                        >
                            Reset Account
                        </NavigateButton>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

const validate = values => ({
    ...validateRequired(values, ['email'])
});

const onSubmit = ({ email }, dispatch) => async setLoading =>
    await dispatch(resetTester(email, setLoading)).catch(({ message }) =>
        dispatch(updateSyncErrors('ResetAccount', { email: message }))
    );

const _AdminHome = compose(
    connect(),
    reduxForm({
        form: 'ResetAccount',
        validate,
        onSubmit
    })
)(AdminHome);

export { _AdminHome as default, _AdminHome as AdminHome };
