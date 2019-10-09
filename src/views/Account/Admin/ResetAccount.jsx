import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { NavigateButton, Input, withModal, Container } from 'components';

//Local
import { ConfirmationModal } from 'views/Modals';
import { deleteOwnAccount } from 'actions';
import { validateEmail, validateRequired, checkEmailQuery } from 'libs';

const useStyles = makeStyles(({ palette, spacing }) => ({
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

const ResetAccount = ({
    handleConfirmationModal,
    deleteOwnAccount,
    email,
    testerId,
    invalid,
    asyncValidating
}) => {
    const c = useStyles();

    const confirmationProps = {
        title: 'Confirmation',
        promptText:
            'Are you sure you want to reset this account? This action is irreversible.',
        cancelText: 'Cancel',
        submitText: 'Reset',
        onSubmit: async () => await deleteOwnAccount(email, testerId)
    };

    return (
        <Paper className={c.root}>
            <Typography className={c.header} variant='h4' gutterBottom>
                Tester Admin Manager
            </Typography>
            <Typography className={c.info} variant='subtitle1' gutterBottom>
                Enter any valid email address, and the account will be reset.
                This can be used for resetting their temporary password and/or
                resetting the account. They will be sent an initial invitation
                email.
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
                            onClick={() => console.log('arstarst')}
                            enableLoader
                            color='secondary'
                            disabled={invalid || !!asyncValidating }
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
                            onClick={() => {}}
                            enableLoader
                            disabled={invalid || !!asyncValidating}
                        >
                            Reset Account
                        </NavigateButton>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

const mapModal = {
    handleConfirmationModal: ConfirmationModal
};

const mapState = ({ auth: { email, testerId } }) => ({
    email,
    testerId
});

const mapDispatch = {
    deleteOwnAccount
};

const validate = values => ({
    ...validateRequired(values, ['email'])
});

const asyncValidate = async ({ email, isPublicUser }) => {
    return await checkEmailQuery(email, isPublicUser);
};

const _ResetAccount = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ResetAccount',
        validate,
        asyncValidate,
        asyncBlurFields: ['email']
    }),
    withModal(mapModal)
)(ResetAccount);

export { _ResetAccount as default, _ResetAccount as ResetAccount };
