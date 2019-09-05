import React, { Fragment } from 'react';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//Local
import { ModalHeader, ModalFooter, ModalContent } from 'components';
import { validateRequired } from 'libs';
import { Button, Input } from 'components';
import { createUserByAdmin } from 'actions';
import { validateEmail } from 'libs';

const useStyles = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.sm,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    footer: {
        padding: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    alignCenter: {
        textAlign: 'center'
    },
    buttonPosition: {
        margin: '0 auto'
    }
}));

const CreateUser = ({ onClose, handleSubmit, invalid }) => {
    const c = useStyles();

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Add new user</ModalHeader>
            <ModalContent className={c.root}>
                <Input required label='First name' name='family_name' />
                <Input required label='Last name' name='given_name' />
                <Input
                    required
                    label='Email'
                    validate={validateEmail}
                    name='email'
                />
            </ModalContent>
            <Divider />
            <ModalFooter className={c.footer}>
                <Button
                    variant='outlined'
                    color='secondary'
                    size='large'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={handleSubmit}
                    disabled={invalid}
                >
                    Create
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

const _CreateUser = compose(
    reduxForm({
        form: 'CreateUser',
        validate: values => ({
            ...validateRequired(values, ['family_name', 'given_name', 'email'])
        }),
        onSubmit: (values, dispatch, { onClose }) =>
            dispatch(createUserByAdmin(values)).then(() => onClose())
    })
)(CreateUser);

export { _CreateUser as default, _CreateUser as CreateUser };
