import API, { graphqlOperation } from '@aws-amplify/api';
import { initialize } from 'redux-form';
import { gql } from 'apollo-boost';

// Local
import { history, today, deserializeDate } from 'libs';
import { client2 } from '../App/client';

// Normalizers
import {
    normalizeTestersList,
    normalizeTestersSearch,
    normalizeTester,
    normalizeTesterForm
} from 'normalizers';

// Graph QL
import { CreateTester } from 'graphql/tester';
import {
    FetchTester,
    FetchPublicTester,
    ListTesters,
    ListTestersSearch,
    UpdateTester,
    RemoveTester
} from 'graphql/tester';

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

// Selectors
import { selectIsTester } from 'selectors';

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
        history.push('/tester');
    } else {
        dispatch(createTesterAction(FAIL));
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
        .then(({ data }) => data)
        .then(({ createTester }) => testerSignUp(createTester));

    if (!res.error) {
        dispatch(createTesterAction(SUCCESS));
        // Todo: do mail stuff here and tester create
    } else {
        dispatch(createTesterAction(FAIL));
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
        data: { listTesters, error = null }
    } = await API.graphql(graphqlOperation(ListTesters));

    if (!error) {
        dispatch(listTestersAction(SUCCESS, normalizeTestersList(listTesters)));
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

const composeFilters = filters => {
    // Local: DB
    const formatFilters = {
        'marital-statuses': 'maritalStatus',
        ethnicities: 'ethnicity',
        'business-sectors': 'employmentSector',
        'employee-counts': 'employeeCount',
        'employment-statuses': 'employmentStatus',
        children: 'hasChildren'
    };

    const localFilters = Object.keys(formatFilters);

    const calculateDob = age => {
        const now = today();

        let nowArray = now.split('-');
        nowArray[0] = nowArray[0] - age;

        return nowArray.join('-');
    };

    return Object.entries(filters).reduce((acm, [key, values]) => {
        if (!!values.length) {
            let filterKey = key;
            let filterValues = values;

            if (localFilters.includes(key)) filterKey = formatFilters[key];

            if (key === 'children') {
                return [
                    ...acm,
                    {
                        or: filterValues.map(filterValue => ({
                            [filterKey]: { eq: filterValue === 'Yes' }
                        }))
                    }
                ];
            }

            if (key === 'disability') {
                const query = {
                    [filterKey]: { between: ['A', 'Z'] }
                };

                return [
                    ...acm,
                    {
                        or: values.map(value =>
                            value === 'Yes' ? query : { not: query }
                        )
                    }
                ];
            }

            if (key === 'age') {
                return [
                    ...acm,
                    {
                        or: {
                            dob: {
                                between: [
                                    calculateDob(filterValues[1]),
                                    calculateDob(filterValues[0])
                                ]
                            }
                        }
                    }
                ];
            }

            return [
                ...acm,
                {
                    or: filterValues.map(filterValue => ({
                        [filterKey]: { contains: filterValue }
                    }))
                }
            ];
        } else return acm;
    }, []);
};

export const listTestersSearch = (filters, search) => async dispatch => {
    const searchFilter = search
        ? [
              {
                  or: [
                      { firstName: { contains: search } },
                      { surname: { contains: search } },
                      { email: { contains: search } },
                      { town: { contains: search } }
                  ]
              }
          ]
        : [];

    // Compose filters
    const filter = {
        and: [...searchFilter, ...composeFilters(filters)]
    };

    dispatch(listTestersSearchAction(REQUEST));
    const {
        data: { listTesters: { items: listTesters = [] } = {}, error = null }
    } = await API.graphql(graphqlOperation(ListTestersSearch, { filter }));

    if (!error) {
        dispatch(
            listTestersSearchAction(
                SUCCESS,
                normalizeTestersSearch(listTesters)
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

    console.log('arstars', datedTester);

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

const removeTesterAction = (async, payload = []) => ({
    type: REMOVE_TESTER,
    async,
    payload
});

export const removeTester = id => async (dispatch, getState) => {
    dispatch(removeTesterAction(REQUEST));
    const {
        data: { deleteTester: { id: testerId } = {}, error = null }
    } = await API.graphql(graphqlOperation(RemoveTester, { input: { id } }));

    if (!error) {
        // Check if tester
        if (selectIsTester(getState())) {
            // Log them out and delete their user
            // Use 'testerId' variable if needed
        } else {
            history.push('/tester');
        }
        dispatch(removeTesterAction(SUCCESS));
    } else {
        dispatch(removeTesterAction(FAIL));
    }
};

const mailTesterAction = () => ({
    type: MAIL_TESTER
});

export const mailTester = ({ from, to, subject, body }) => async dispatch => {
    // dispatch(mailTesterAction());
};
