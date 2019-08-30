import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Local
import { composeEditData } from 'libs';
import {
    EditModal
} from 'components';

// Selectors
import { selectProjectId, selectProjectProfiles } from 'selectors';

// Actions
import { updateProject } from 'actions';


const mapState = (state, { editIndex }) => {
    const profiles = selectProjectProfiles(state);

    return {
        id: selectProjectId(state),
        profiles: profiles.map(({ Profile: { Component } }) => Component),
        ...composeEditData(profiles, editIndex),
        title: 'Profile Edit'
    };
};

const onSubmit = ({ Profile }, dispatch, { id, profiles, editIndex, onClose }) => {
    profiles[editIndex] = Profile;
    dispatch(updateProject({ id, profiles })).then(() => onClose());
};

const ProfileEditModal = compose(
    connect(mapState),
    reduxForm({
        form: 'ProfileEdit',
        onSubmit
    })
)(EditModal);

export { ProfileEditModal as default, ProfileEditModal };