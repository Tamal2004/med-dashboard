import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';
import { gql } from 'apollo-boost';

// Local
import { history, today } from 'libs';
import { client2 } from '../App/client';

// Normalizers
import {
    normalizeTestersList,
    normalizeTester,
    normalizeTesterForm
} from 'normalizers';

// Graph QL
// import { createTester as gQLCreateTester } from 'graphql/mutations';
import { CreateTester } from 'graphql/tester';
import {
    FetchTester,
    FetchPublicTester,
    ListTesters,
    UpdateTester
} from 'graphql/tester';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_TESTER,
    LIST_TESTERS,
    FETCH_TESTER,
    UPDATE_TESTER
} from 'actionTypes';

import { testerSignUp } from 'actions';

// Create Tester
const createTesterAction = async => ({
    type: CREATE_TESTER,
    async
});

export const createTester = tester => async dispatch => {
    dispatch(createTesterAction(REQUEST));
    const res = await API.graphql(
        graphqlOperation(CreateTester, { input: tester })
    );

    if (!res.error) {
        dispatch(createTesterAction(SUCCESS));
        // Todo: do mail stuff here and tester create
        history.push('/tester');
    } else {
        dispatch(createTesterAction(FAIL));
    }
};

export const createPublicTester = tester => async dispatch => {
    console.log('meh');
    dispatch(createTesterAction(REQUEST));
    // const res = await API.graphql(
    //     graphqlOperation(CreateTester, { input: tester })
    // );

    console.log('client2 creds ', client2);

    client2
        .mutate({
            mutation: gql(CreateTester),
            variables: { input: tester }
        })
        .then(({ data }) => data)
        .then(({ createTester }) => testerSignUp(createTester));

    // if (!res.error) {
    //     dispatch(createTesterAction(SUCCESS));
    //     // Todo: do mail stuff here and tester create
    //     history.push('/tester');
    // } else {
    //     dispatch(createTesterAction(FAIL));
    // }
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
        data: { listTesters, error = null }
    } = await API.graphql(graphqlOperation(ListTesters));

    if (!error) {
        dispatch(listTestersAction(SUCCESS, normalizeTestersList(listTesters)));
    } else {
        dispatch(listTestersAction(FAIL));
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
    dispatch(fetchTesterAction());

    const {
        data: { getTester, error = null }
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
    }
};
