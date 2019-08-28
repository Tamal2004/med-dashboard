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

// Selectors
import { selectProjectId, selectProjectProfiles } from 'selectors';

// Actions
import { updateProject } from 'actions';

const ProfileEditModal = ({ formData, onClose, handleSubmit, dirty }) => {
    const c = useStyles();
    const rows = [];

    formData.map((segment, index) =>
        rows.push(
            <Input key={index} label={segment.label} name={segment.key} />
        )
    );

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>Profile Edit</ModalHeader>
            <ModalContent className={c.root}>
                <Fragment>{rows}</Fragment>
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
                    onClick={() => {
                        if (dirty) handleSubmit();
                        onClose();
                    }}
                >
                    Update
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

ProfileEditModal.defaultProps = {};

ProfileEditModal.propTypes = {};

const composeEditData = (data, idx) => {
    const row = data[idx];

    const isEditable = value =>
        Object.prototype.hasOwnProperty.call(value, 'editable');

    const name = value => value.split(' ').join('');

    if (row && typeof row === 'object') {
        return Object.entries(row).reduce(
            (acm, [key, value]) => {
                if (isEditable(value)) {
                    return {
                        initialValues: {
                            ...acm.initialValues,
                            [name(key)]: value.value || value.Component
                        },
                        formData: [
                            ...acm.formData,
                            { key: name(key), label: key }
                        ]
                    };
                }
                return acm;
            },
            {
                initialValues: {},
                formData: []
            }
        );
    }
    return { initialValues: {}, formData: [] };
};

const mapState = (state, { editIndex }) => {
    const profiles = selectProjectProfiles(state);

    return {
        id: selectProjectId(state),
        profiles: profiles.map(({ Profile: { Component } }) => Component),
        ...composeEditData(profiles, editIndex)
    };
};

const onSubmit = ({ Profile }, dispatch, { id, profiles, editIndex }) => {
    profiles[editIndex] = Profile;
    dispatch(updateProject({ id, profiles }));
};

const _ProfileEditModal = compose(
    connect(mapState),
    reduxForm({
        form: 'ProfileEdit',
        onSubmit
    })
)(ProfileEditModal);

export { _ProfileEditModal as default, _ProfileEditModal as ProfileEditModal };
