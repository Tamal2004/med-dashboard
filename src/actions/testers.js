import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';

// Local
import { history, today, composeSearch, composeFilters } from 'libs';
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
    FetchTesterEmail,
    ListTesters,
    ListTestersSearch,
    UpdateTester,
    RemoveTester,
    ListTesterTowns
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
    LIST_TESTER_TOWNS,
    FETCH_TESTER,
    UPDATE_TESTER,
    REMOVE_TESTER,
    MAIL_TESTER,
    MAIL_TESTERS,
    SET_FILTERS,
    RESET_FILTERS,
    SET_PAGE,
    SET_SORT_INDEX,
    SET_SORT_INDICES
} from 'actionTypes';
import { showNotification } from './notification';
import { unsubscribeUser, changCongnitoUserInfo } from './auth';

// Selectors
import {
    selectTesterId,
    selectFullName,
    selectTesterSessionIds,
    selectTesterContactNoteIds,
    selectIsValidTesterQuery,
    selectTowns,
    selectBackwardTesterId,
    selectForwardTesterId
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
        await dispatch(testerSignUp(createTester));
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
    try {
        const {
            data: { createTester }
        } = await client2.mutate({
            mutation: gql(CreateTester),
            variables: { input: tester }
        });

        await dispatch(testerSignUp(createTester));
        dispatch(createTesterAction(SUCCESS));
    } catch {
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

    try {
        const {
            data: {
                listSortedTesters: { items: listSortedTesters = [] }
            }
        } = await API.graphql(graphqlOperation(ListTesters));

        dispatch(
            listTestersAction(SUCCESS, normalizeTestersList(listSortedTesters))
        );
    } catch ({
        data: {
            listSortedTesters: { items: listSortedTesters = [] }
        }
    }) {
        if (!!listSortedTesters) {
            dispatch(
                listTestersAction(
                    SUCCESS,
                    normalizeTestersList(listSortedTesters)
                )
            );
        } else {
            dispatch(listTestersAction(FAIL));
        }
    }
};

// List Testers Search
const listTestersSearchAction = (
    async,
    payload = [],
    queryId = null,
    isFinal = false
) => ({
    type: LIST_TESTERS_SEARCH,
    async,
    payload,
    meta: { queryId, isFinal }
});

export const listTestersSearch = (filters, search) => async (
    dispatch,
    getState
) => {
    // Compose filters
    const filter = {
        and: [...composeSearch(search), ...composeFilters(filters)]
    };
    const queryId = uuid();

    dispatch(listTestersSearchAction(REQUEST, [], queryId));

    const runQuery = async (pageToken = null, firstTime = true) => {
        if (
            selectIsValidTesterQuery(getState(), queryId) &&
            (firstTime || pageToken)
        ) {
            const variables = {
                filter,
                ...(pageToken ? { nextToken: pageToken } : {})
            };

            const {
                data: {
                    listSortedTesters: {
                        items: listSortedTesters = [],
                        nextToken
                    } = {},
                    error = null
                }
            } = await API.graphql(
                graphqlOperation(ListTestersSearch, variables)
            );

            if (!error) {
                dispatch(
                    listTestersSearchAction(
                        SUCCESS,
                        normalizeTestersSearch(listSortedTesters),
                        queryId,
                        !nextToken
                    )
                );
            } else {
                dispatch(listTestersSearchAction(FAIL));
            }
            runQuery(nextToken, false);
        }
    };

    return await runQuery();
};

// Fetch Tester
const fetchTesterAction = (async, payload = []) => ({
    type: FETCH_TESTER,
    async,
    payload
});

export const fetchTester = id => async dispatch => {
    const dispatchSuccess = tester => {
        const {
            testerDetails,
            contactDetails,
            employmentDetails,
            testerData
        } = normalizeTester(tester);

        dispatch(initialize('TesterDetails', testerDetails));
        dispatch(initialize('ContactDetails', contactDetails));
        dispatch(initialize('EmploymentDetails', employmentDetails));

        dispatch(fetchTesterAction(SUCCESS, testerData));
    };

    try {
        dispatch(fetchTesterAction(REQUEST));

        const {
            data: { getTester }
        } = await API.graphql(graphqlOperation(FetchTester, { id }));
        dispatchSuccess(getTester);
    } catch ({ data: { getTester } = {} }) {
        if (!!getTester) {
            dispatchSuccess(getTester);
        } else {
            dispatch(fetchTesterAction(FAIL));
            dispatch(
                showNotification({
                    type: 'error',
                    message: 'Something went wrong fetching the tester!'
                })
            );
            history.push('/tester');
        }
    }
};

export const fetchPublicTester = id => async dispatch => {
    const dispatchSuccess = ({
        sessions: { items: sessions = [] },
        contactNotes: { items: contactNotes = [] },
        ...getTester
    }) => {
        const {
            testerDetails,
            contactDetails,
            employmentDetails
        } = normalizeTesterForm(getTester);

        dispatch(initialize('TesterDetails', testerDetails));
        dispatch(initialize('ContactDetails', contactDetails));
        dispatch(initialize('EmploymentDetails', employmentDetails));
        dispatch(fetchTesterAction(SUCCESS, { id, sessions, contactNotes }));
    };

    try {
        dispatch(fetchTesterAction(REQUEST));
        const {
            data: { getTester }
        } = await API.graphql(graphqlOperation(FetchPublicTester, { id }));
        dispatchSuccess(getTester);
    } catch ({ data: { getTester } = {} }) {
        if (!!getTester) {
            dispatchSuccess(getTester);
        } else {
            dispatch(fetchTesterAction(FAIL));
            dispatch(
                showNotification({
                    type: 'error',
                    message: 'Something went wrong fetching your record!'
                })
            );
            history.push('/invalid');
        }
    }
};

// Update Tester
const updateTesterAction = async => ({
    type: UPDATE_TESTER,
    async
});

export const updateTester = ({
    lastUpdated,
    email = void 0,
    ...tester
}) => async dispatch => {
    const datedTester = {
        lastUpdated: today(),
        ...tester
    };

    const { firstName, surname } = tester;

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
        if (email)
            await dispatch(
                changCongnitoUserInfo({ email, firstName, surname })
            );

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
        graphqlOperation(
            RemoveTester(!!sessionIds.length, !!contactNoteIds.length),
            {
                ...(sessionIds.length ? { sessionIds } : {}),
                ...(contactNoteIds.length ? { contactNoteIds } : {}),
                input: { id }
            }
        )
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

const publicFetchTesterEmail = async id => {
    const {
        data: {
            getTester: {
                email = null,
                sessions: { items: sessionIds = [] },
                contactNotes: { items: contactNoteIds = [] }
            } = {}
        } = {}
    } = await client2.query({
        query: gql(FetchTesterEmail),
        variables: {
            id
        }
    });

    return {
        email,
        sessionIds,
        contactNoteIds
    };
};

const publicRemoveTester = (
    id,
    email,
    sessionIds,
    contactNoteIds
) => async dispatch => {
    const sessionList = sessionIds.map(({ id }) => id);
    const contactNoteList = contactNoteIds.map(({ id }) => id);

    return client2
        .mutate({
            mutation: gql(
                RemoveTester(!!sessionList.length, !!contactNoteList.length)
            ),
            variables: {
                ...(sessionList.length ? { sessionIds: sessionList } : {}),
                ...(contactNoteList.length
                    ? { contactNoteIds: contactNoteList }
                    : {}),
                input: { id }
            }
        })
        .then(({ data: { error = null } }) => {
            if (!error && email) {
                dispatch(unsubscribeUser(email));
            } else {
                dispatch(
                    showNotification({
                        type: 'error',
                        message: error.message
                    })
                );
            }
        });
};

export const unsubscribeTester = id => async dispatch => {
    try {
        const {
            email,
            sessionIds,
            contactNoteIds
        } = await publicFetchTesterEmail(id);

        if (!email) {
            dispatch(
                showNotification({
                    type: 'error',
                    message: "User doesn't exist"
                })
            );
        } else {
            await dispatch(
                publicRemoveTester(id, email, sessionIds, contactNoteIds)
            );
        }
    } catch {
        dispatch(
            showNotification({
                type: 'error',
                message: "User doesn't exist"
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

export const mailTesters = (
    { project, contactType, ...mail },
    mailData,
    setLoading
) => async (dispatch, getState) => {
    dispatch(mailTestersAction(REQUEST));

    const generateLoading = data => {
        let count = 0;
        return () => {
            count++;
            setLoading(Math.ceil((count / data.length) * 100));
        };
    };
    const updateLoading = generateLoading(mailData);
    setLoading(1);

    const username = selectFullName(getState());
    const composeSend = async ({ email, id }) => {
        const response = await sendMail({ ...mail, to: [email], testerId: id });
        updateLoading();
        return response;
    };

    const { contactNotes, sendMails } = mailData.reduce(
        ({ contactNotes, sendMails }, { email, id }) => ({
            contactNotes: [
                ...contactNotes,
                {
                    contactNoteTesterId: id,
                    contactNoteProjectId: project,
                    type: contactType,
                    note: mail.body.replace(/<\/?[^>]+>/gi, ' '),
                    date: today(),
                    contactedBy: username
                }
            ],
            sendMails: [...sendMails, composeSend({ email, id })]
        }),
        { contactNotes: [], sendMails: [] }
    );

    await Promise.all(sendMails);

    const {
        data: { error = null }
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

const listTesterTownsAction = (async, payload) => ({
    type: LIST_TESTER_TOWNS,
    async,
    payload
});

export const listTesterTowns = () => async (dispatch, getState) => {
    dispatch(listTesterTownsAction(REQUEST));
    const runQuery = async (pageToken = null, firstTime = true) => {
        if (firstTime || pageToken) {
            const variables = {
                ...(pageToken ? { nextToken: pageToken } : {})
            };

            try {
                const {
                    data: {
                        listSortedTesters: {
                            items: listSortedTesters = [],
                            nextToken
                        } = {}
                    }
                } = await API.graphql(
                    graphqlOperation(ListTesterTowns, variables)
                );

                dispatch(
                    listTesterTownsAction(
                        SUCCESS,
                        listSortedTesters.map(({ town }) => town)
                    )
                );

                runQuery(nextToken, false);
            } catch {
                dispatch(listTesterTownsAction(FAIL));
            }
        }
    };

    if (!selectTowns(getState()).length) return await runQuery();
};

export const setFilter = filters => ({
    type: SET_FILTERS,
    payload: filters
});

const resetFiltersAction = () => ({
    type: RESET_FILTERS
});

export const resetFilters = () => dispatch => {
    dispatch(resetFiltersAction());
    dispatch(listTesterTowns());
};

export const setPage = page => ({
    type: SET_PAGE,
    payload: page
});

export const setSortIndex = sortIndex => ({
    type: SET_SORT_INDEX,
    payload: sortIndex
});

export const setSortIndices = sortIndices => ({
    type: SET_SORT_INDICES,
    payload: sortIndices
});

export const moveBackwardTester = testerId => (dispatch, getState) => {
    const store = getState();
    const { id, page } = selectBackwardTesterId(store, testerId);
    history.push(`/tester/${id}?search=true`);
    page && dispatch(setPage(page));
};

export const moveForwardTester = testerId => (dispatch, getState) => {
    const store = getState();
    const { id, page } = selectForwardTesterId(store, testerId);
    history.push(`/tester/${id}?search=true`);
    page && dispatch(setPage(page));
};
