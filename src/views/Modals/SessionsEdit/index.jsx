import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Local
import { composeEditData } from 'libs';
import { EditModal } from 'components';

// Selectors
import { selectTesterSessions, selectSessionId } from 'selectors';

// Actions
import { updateSession } from 'actions';

const mapState = (state, { editIndex }) => {
    const sessions = selectTesterSessions(state);

    return {
        ...composeEditData(sessions, editIndex),
        id: selectSessionId(state, editIndex),
        title: 'Session Edit'
    };
};

const onSubmit = ({ Date, Time, Notes }, dispatch, { id }) =>
    dispatch(updateSession({ id, date: Date, time: Time, notes: Notes }));

const _SessionsEditModal = compose(
    connect(mapState),
    reduxForm({
        form: 'SessionsEdit',
        onSubmit
    })
)(EditModal);

export {
    _SessionsEditModal as default,
    _SessionsEditModal as SessionsEditModal
};
