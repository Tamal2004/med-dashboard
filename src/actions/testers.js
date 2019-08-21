import API, { graphqlOperation } from '@aws-amplify/api';

// Local
import { history } from 'libs';

// Graph QL
import { createTester as gQLCreateTester } from 'graphql/mutations';
import { listTesters as gQLListTesters } from 'graphql/queries';

// Action Types
import {
    REQUEST,
    SUCCESS,
    FAIL,
    CREATE_TESTER,
    FETCH_TESTERS
} from 'store/actionTypes';

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

const fetchTestersAction = (async, payload = []) => ({
    type: FETCH_TESTERS,
    async,
    payload
});

export const fetchTesters = () => async dispatch => {
    dispatch(fetchTestersAction(REQUEST));
    const {
        data: { listTesters, error = null }
    } = await API.graphql(graphqlOperation(gQLListTesters));

    console.log(listTesters);

    if (!error) {
        dispatch(fetchTestersAction(SUCCESS, listTesters));
    } else {
        dispatch(fetchTestersAction(FAIL));
    }
};
