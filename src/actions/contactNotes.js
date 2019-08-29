import API, { graphqlOperation } from '@aws-amplify/api';

// Normalizers
import { normalizeContactNote } from 'normalizers';

// Graph QL
import {
    CreateContactNote,
    UpdateContactNote,
    RemoveContactNote
} from 'graphql/contactNotes';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_CONTACT_NOTE,
    UPDATE_CONTACT_NOTE,
    REMOVE_CONTACT_NOTE
} from 'actionTypes';

const createContactNoteAction = (async, payload = []) => ({
    type: CREATE_CONTACT_NOTE,
    async,
    payload
});

export const createContactNote = input => async dispatch => {
    dispatch(createContactNoteAction(REQUEST));
    const {
        data: { createContactNote, error = null }
    } = await API.graphql(graphqlOperation(CreateContactNote, { input }));

    if (!error) {
        dispatch(
            createContactNoteAction(
                SUCCESS,
                normalizeContactNote(createContactNote)
            )
        );
    } else {
        dispatch(createContactNoteAction(FAIL));
    }
};

const updateContactNoteAction = (async, payload = []) => ({
    type: UPDATE_CONTACT_NOTE,
    async,
    payload
});

export const updateContactNote = input => async dispatch => {
    dispatch(updateContactNoteAction(REQUEST));
    const {
        data: { updateContactNote, error = null }
    } = await API.graphql(graphqlOperation(UpdateContactNote, { input }));

    if (!error) {
        dispatch(
            updateContactNoteAction(
                SUCCESS,
                normalizeContactNote(updateContactNote)
            )
        );
    } else {
        dispatch(updateContactNoteAction(FAIL));
    }
};

const removeContactNoteAction = (async, payload = []) => ({
    type: REMOVE_CONTACT_NOTE,
    async,
    payload
});

export const removeContactNote = id => async dispatch => {
    dispatch(removeContactNoteAction(REQUEST));
    const {
        data: { deleteContactNote: { id: contactNoteId } = {}, error = null }
    } = await API.graphql(
        graphqlOperation(RemoveContactNote, { input: { id } })
    );

    if (!error) {
        dispatch(removeContactNoteAction(SUCCESS, contactNoteId));
    } else {
        dispatch(removeContactNoteAction(FAIL));
    }
};
