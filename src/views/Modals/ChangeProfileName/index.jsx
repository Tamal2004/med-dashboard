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
import { changeUserInfo, updateTester } from 'actions';

const UpdateProfile = ({
    onClose,
    handleSubmit,
    invalid,
    submitting,
    isTester
}) => {
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
                    onClick={onClose || submitting}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={async () => await handleSubmit()}
                    enableLoader
                    disabled={invalid}
                >
                    Update
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

const mapState = state => {
    const {
        auth: { email, firstName, surname, isTester, testerId }
    } = state;
    return {
        isTester,
        initialValues: {
            id: testerId || void 0,
            email,
            firstName,
            surname
        }
    };
};

const mapDispatch = {};

const onSubmit = async (values, dispatch, { onClose, isTester }) => {
    const ACTION = isTester ? updateTester(values) : changeUserInfo(values);
    await dispatch(ACTION).then(() => onClose());
};

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
