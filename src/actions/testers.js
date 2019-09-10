import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';
import { gql } from 'apollo-boost';

// Local
import {
    history,
    today,
    deserializeDate,
    composeSearch,
    composeFilters
} from 'libs';
import { client2 } from '../App/client';
import { sendMail } from 'services';

// Normalizers
import {
    normalizeTestersList,
    normalizeTestersSearch,
    normalizeTester,
    normalizeTesterForm,
    normalizeContactNote
} from 'normalizers';

// Graph QL
import {
    CreateTester,
    FetchTester,
    FetchPublicTester,
    ListTesters,
    ListTestersSearch,
    UpdateTester,
    RemoveTester
} from 'graphql/tester';
import { CreateContactNotes, CreateContactNote } from 'graphql/contactNotes';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_TESTER,
    LIST_TESTERS,
    LIST_TESTERS_SEARCH,
    FETCH_TESTER,
    UPDATE_TESTER,
    REMOVE_TESTER,
    MAIL_TESTER,
    MAIL_TESTERS
} from 'actionTypes';
import { showNotification } from './notification';

// Selectors
import {
    selectTesterId,
    selectFullName,
    selectTesterSessionIds,
    selectTesterContactNoteIds
} from 'selectors';

import { testerSignUp } from './auth';

// Create Tester
const createTesterAction = async => ({
    type: CREATE_TESTER,
    async
});

export const createTester = tester => async dispatch => {
    dispatch(createTesterAction(REQUEST));
    const {
        data: { createTester, error = null }
    } = await API.graphql(graphqlOperation(CreateTester, { input: tester }));

    if (!error) {
        dispatch(createTesterAction(SUCCESS));
        dispatch(testerSignUp(createTester));
        history.push('/tester');
    } else {
        dispatch(createTesterAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

// PUBLIC
export const createPublicTester = tester => async dispatch => {
    dispatch(createTesterAction(REQUEST));
    const res = client2
        .mutate({
            mutation: gql(CreateTester),
            variables: { input: tester }
        })
        .then(({ data: { createTester } }) =>
            dispatch(testerSignUp(createTester))
        );

    if (!res.error) {
        dispatch(createTesterAction(SUCCESS));
    } else {
        dispatch(createTesterAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

// List Tester
const listTestersAction = (async, payload = []) => ({
    type: LIST_TESTERS,
    async,
    payload
});

export const listTesters = () => async dispatch => {
    dispatch(listTestersAction(REQUEST));
    const {
        data: {
            listSortedTesters: { items: listSortedTesters = [] },
            error = null
        }
    } = await API.graphql(graphqlOperation(ListTesters));

    if (!error) {
        dispatch(
            listTestersAction(SUCCESS, normalizeTestersList(listSortedTesters))
        );
    } else {
        dispatch(listTestersAction(FAIL));
    }
};

// List Testers Search
const listTestersSearchAction = (async, payload = []) => ({
    type: LIST_TESTERS_SEARCH,
    async,
    payload
});

export const listTestersSearch = (filters, search) => async dispatch => {
    // Compose filters
    const filter = {
        and: [...composeSearch(search), ...composeFilters(filters)]
    };

    dispatch(listTestersSearchAction(REQUEST));
    const {
        data: {
            listSortedTesters: { items: listSortedTesters = [] } = {},
            error = null
        }
    } = await API.graphql(graphqlOperation(ListTestersSearch, { filter }));

    if (!error) {
        dispatch(
            listTestersSearchAction(
                SUCCESS,
                normalizeTestersSearch(listSortedTesters)
            )
        );
    } else {
        dispatch(listTestersSearchAction(FAIL));
    }
};

// Fetch Tester
const fetchTesterAction = (async, payload = []) => ({
    type: FETCH_TESTER,
    async,
    payload
});

export const fetchTester = id => async dispatch => {
    dispatch(fetchTesterAction(REQUEST));

    const {
        data: { getTester, error = null }
    } = await API.graphql(graphqlOperation(FetchTester, { id }));

    const {
        testerDetails,
        contactDetails,
        employmentDetails,
        testerData
    } = normalizeTester(getTester);

    if (!error) {
        dispatch(initialize('TesterDetails', testerDetails));
        dispatch(initialize('ContactDetails', contactDetails));
        dispatch(initialize('EmploymentDetails', employmentDetails));

        dispatch(fetchTesterAction(SUCCESS, testerData));
    } else {
        dispatch(fetchTesterAction(FAIL));
    }
};

export const fetchPublicTester = id => async dispatch => {
    dispatch(fetchTesterAction(REQUEST));
    const {
        data: {
            getTester: {
                sessions: { items: sessions = [] },
                contactNotes: { items: contactNotes = [] },
                ...getTester
            },
            error = null
        }
    } = await API.graphql(graphqlOperation(FetchPublicTester, { id }));

    const {
        testerDetails,
        contactDetails,
        employmentDetails
    } = normalizeTesterForm(getTester);

    if (!error) {
        dispatch(initialize('TesterDetails', testerDetails));
        dispatch(initialize('ContactDetails', contactDetails));
        dispatch(initialize('EmploymentDetails', employmentDetails));
        dispatch(fetchTesterAction(SUCCESS, { id, sessions, contactNotes }));
    } else {
        dispatch(fetchTesterAction(FAIL));
    }
};

// Update Tester
const updateTesterAction = async => ({
    type: UPDATE_TESTER,
    async
});

export const updateTester = ({ lastUpdated, ...tester }) => async dispatch => {
    const datedTester = {
        lastUpdated: today(),
        ...tester
    };

    dispatch(updateTesterAction(REQUEST));
    const {
        data: { updateTester, error = null }
    } = await API.graphql(
        graphqlOperation(UpdateTester, { input: datedTester })
    );

    if (!error) {
        const {
            testerDetails,
            contactDetails,
            employmentDetails
        } = normalizeTesterForm(updateTester, false);

        dispatch(initialize('TesterDetails', testerDetails));
        dispatch(initialize('ContactDetails', contactDetails));
        dispatch(initialize('EmploymentDetails', employmentDetails));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Updated successfully'
            })
        );
    } else {
        dispatch(
            showNotification({
                type: 'error',
                message: 'Failed! Something went wrong!'
            })
        );
    }
};

const removeTesterAction = (async, payload = []) => ({
    type: REMOVE_TESTER,
    async,
    payload
});

export const removeTester = id => async (dispatch, getState) => {
    dispatch(removeTesterAction(REQUEST));

    const store = getState();

    const sessionIds = selectTesterSessionIds(store);
    const contactNoteIds = selectTesterContactNoteIds(store);

    const {
        data: { error = null }
    } = await API.graphql(
        graphqlOperation(RemoveTester, {
            input: { id },
            contactNoteIds,
            sessionIds
        })
    );

    if (!error) {
        dispatch(removeTesterAction(SUCCESS));
        history.push('/tester');
        dispatch(
            showNotification({
                type: 'success',
                message: 'Successfully deleted!'
            })
        );
    } else {
        dispatch(removeTesterAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Remove failed'
            })
        );
    }
};

const mailTesterAction = (async, payload) => ({
    type: MAIL_TESTER,
    async,
    payload
});

export const mailTester = ({ project, contactType, ...mail }) => async (
    dispatch,
    getState
) => {
    dispatch(mailTesterAction(REQUEST));

    const store = getState();
    const contactNote = {
        contactNoteTesterId: selectTesterId(store),
        contactNoteProjectId: project,
        type: contactType,
        note: mail.body.replace(/<\/?[^>]+>/gi, ' '),
        date: today(),
        contactedBy: selectFullName(store)
    };

    await sendMail(mail);

    const {
        data: { createContactNote, error = null }
    } = await API.graphql(
        graphqlOperation(CreateContactNote, { input: contactNote })
    );

    if (!error) {
        dispatch(
            mailTesterAction(SUCCESS, normalizeContactNote(createContactNote))
        );
        dispatch(
            showNotification({
                type: 'success',
                message: 'Mail sent successfully!'
            })
        );
    } else {
        dispatch(mailTesterAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Mail did not send!'
            })
        );
    }
};

const mailTestersAction = async => ({
    type: MAIL_TESTERS,
    async
});

export const mailTesters = ({ project, contactType, ...mail }, ids) => async (
    dispatch,
    getState
) => {
    dispatch(mailTestersAction(REQUEST));

    const username = selectFullName(getState());
    const contactNotes = ids.map(id => {
        return {
            contactNoteTesterId: id,
            contactNoteProjectId: project,
            type: contactType,
            note: mail.body.replace(/<\/?[^>]+>/gi, ' '),
            date: today(),
            contactedBy: username
        };
    });

    await sendMail(mail);

    const {
        data: { createContactNotes, error = null }
    } = await API.graphql(
        graphqlOperation(CreateContactNotes, { contactNotes })
    );

    if (!error) {
        dispatch(mailTestersAction(SUCCESS));
        dispatch(
            showNotification({
                type: 'success',
                message: 'Mails sent'
            })
        );
    } else {
        dispatch(mailTestersAction(FAIL));
        dispatch(
            showNotification({
                type: 'error',
                message: 'Mails not sent'
            })
        );
    }
};

export const requestMail = mail => async dispatch => {
    try {
        await sendMail(mail);
        dispatch(
            showNotification({
                type: 'success',
                message: 'Mail sent successfully!'
            })
        );
    } catch {
        dispatch(
            showNotification({
                type: 'error',
                message: 'Request failed to send.'
            })
        );
    }
};
