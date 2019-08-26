import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';

// Local
import { history } from 'libs';

// Normalizers
import { normalizeTestersList, normalizeTester } from 'normalizers';

// Graph QL
import { createTester as gQLCreateTester } from 'graphql/mutations';
import { ListTesters, FetchTester } from 'graphql/tester';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_TESTER,
    LIST_TESTERS,
    FETCH_TESTER
} from 'actionTypes';

const createTesterAction = async => ({
    type: CREATE_TESTER,
    async
});

export const createTester = tester => async dispatch => {
    dispatch(createTesterAction(REQUEST));
    const res = await API.graphql(
        graphqlOperation(gQLCreateTester, { input: tester })
    );

    if (!res.error) {
        dispatch(createTesterAction(SUCCESS));
        // Todo: do mail stuff here and tester create
        history.push('/tester');
    } else {
        dispatch(createTesterAction(FAIL));
    }
};

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

const fetchTesterAction = (async, payload = []) => ({
    type: FETCH_TESTER,
    async,
    payload
});

export const fetchTester = id => async dispatch => {
    dispatch(fetchTesterAction(REQUEST));
    const {
        testerDetails,
        contactDetails,
        employmentDetails
    } = normalizeTester();
    dispatch(initialize('TesterDetails', testerDetails, true));
    dispatch(initialize('ContactDetails', contactDetails));
    dispatch(initialize('EmploymentDetails', employmentDetails));
    // const {
    //     data: { getTester, error = null }
    // } = await API.graphql(graphqlOperation(FetchTester, { id }));
    //
    // console.log(getTester);
    //
    // if (!error) {
    //     dispatch(fetchTesterAction(SUCCESS, normalizeTester(getTester)));
    // } else {
    //     dispatch(fetchTesterAction(FAIL));
    // }
};
