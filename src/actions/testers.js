import API, { graphqlOperation } from '@aws-amplify/api';

// Local
import { history } from 'libs';

// Normalizers
import { normalizeTesters } from 'normalizers';

// Graph QL
import { createTester as gQLCreateTester } from 'graphql/mutations';
import { ListTesters } from 'graphql/tester';

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
        dispatch(listTestersAction(SUCCESS, normalizeTesters(listTesters)));
    } else {
        dispatch(listTestersAction(FAIL));
    }
};

//
// const fetchTestersAction = (async, payload = []) => ({
//     type: FETCH_TESTERS,
//     async,
//     payload
// });
//
// export const fetchTestersHome = () => async dispatch => {
//     dispatch(fetchTestersHomeAction(REQUEST));
//     const {
//         data: { listTesters, error = null }
//     } = await API.graphql(graphqlOperation(listTestersHome));
//
//     if (!error) {
//         dispatch(
//             fetchTestersHomeAction(SUCCESS, normalizeTestersHome(listTesters))
//         );
//     } else {
//         dispatch(fetchTestersHomeAction(FAIL));
//     }
// };
