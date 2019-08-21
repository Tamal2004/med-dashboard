import API, { graphqlOperation } from '@aws-amplify/api';

// Local
import { history } from 'libs';

// Graph QL
import { createTester as gQLCreateTester } from 'graphql/mutations';

// Action Types
import { REQUEST, SUCCESS, FAIL, CREATE_TESTER } from 'store/actionTypes';

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
