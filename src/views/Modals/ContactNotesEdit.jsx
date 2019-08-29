import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Local
import { composeEditData } from 'libs';
import { EditModal } from 'components';

// Selectors
import { selectTesterContactNotes, selectContactNoteId } from 'selectors';

// Actions
import { updateContactNote } from 'actions';

const mapState = (state, { editIndex }) => {
    const contactNotes = selectTesterContactNotes(state);

    return {
        ...composeEditData(contactNotes, editIndex),
        id: selectContactNoteId(state, editIndex),
        title: 'Contact Note Edit'
    };
};

const onSubmit = ({ ContactType, Details }, dispatch, { id, onClose }) =>
    dispatch(updateContactNote({ id, type: ContactType, note: Details })).then(
        () => onClose()
    );

const ContactNotesEditModal = compose(
    connect(mapState),
    reduxForm({
        form: 'ContactNotesEdit',
        onSubmit
    })
)(EditModal);

export { ContactNotesEditModal as default, ContactNotesEditModal };
