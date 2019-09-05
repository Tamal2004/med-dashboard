import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Input
} from 'components';
import { validateRequired } from 'libs';

// Actions
import { changeUserInfo } from 'actions';

const UpdateProfile = ({ onClose, handleSubmit, invalid, submitting }) => {
    const c = useStyles();

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>
                Change profile information
            </ModalHeader>
            <ModalContent className={c.root}>
                <Input label='Firstname' name='firstName' />
                <Input label='Surname' name='surname' />
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
                    disabled={invalid || submitting}
                >
                    Update
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

const mapState = state => {
    const {
        auth: { email, firstName, surname }
    } = state;
    return {
        initialValues: {
            email,
            firstName,
            surname
        }
    };
};

const mapDispatch = {};

const onSubmit = (values, dispatch, { onClose }) =>
    dispatch(changeUserInfo(values)).then(res => res === 200 && onClose());

const _UpdateProfile = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'UserProfile',
        validate: values => ({
            ...validateRequired(values, ['firstName', 'surname'])
        }),
        onSubmit
    })
)(UpdateProfile);

export { _UpdateProfile as default, _UpdateProfile as UpdateProfile };
