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
import { createClient } from 'actions';

const AddNewClient = ({ onClose, handleSubmit, invalid }) => {
    const c = useStyles();

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Add new client</ModalHeader>
            <ModalContent className={c.root}>
                <Input label='Client Name' name='name' />
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

const mapDispatch = {};

const onSubmit = (values, dispatch, { onClose }) =>
    dispatch(createClient(values)).then(() => onClose());

const _AddNewClient = compose(
    connect(
        null,
        mapDispatch
    ),
    reduxForm({
        form: 'NewClient',
        validate: values => ({ ...validateRequired(values, ['name']) }),
        onSubmit
    })
)(AddNewClient);

export { _AddNewClient as default, _AddNewClient as AddNewClient };
