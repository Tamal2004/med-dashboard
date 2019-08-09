import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Select,
    MultiInput
} from 'components';

const ContactsModal = ({ data, onClose }) => {
    const c = useStyles();
    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Create New Contact Note</ModalHeader>
            <ModalContent className={c.root}>
                <Select
                    label='Contact Type'
                    name='contactType'
                    data={[]}
                    required
                />
                <MultiInput
                    name='notes'
                    placeholder='Message details'
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
                <Button variant='contained' color='primary' size='large'>
                    Add Note
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

ContactsModal.defaultProps = {};

ContactsModal.propTypes = {};

const mapState = () => ({});
const mapDispatch = {};

const _ContactsModal = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'TesterContacts'
    })
)(ContactsModal);

export { _ContactsModal as default, _ContactsModal as ContactsModal };
