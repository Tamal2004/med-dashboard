import API, { graphqlOperation } from '@aws-amplify/api';

import { validateRequired } from 'libs';
import { CheckProjectReference } from 'graphql/project';

export const validate = values => {
    const required = [
        'reference',
        'title',
        'projectClientId',
        'principalContact',
        'testingDate',
        'manager'
    ];

    return { ...validateRequired(values, required) };
};

export const asyncValidate = ({ reference }) =>
    API.graphql(
        graphqlOperation(CheckProjectReference, {
            filter: { reference: { eq: reference.trim() } }
        })
    ).then(
        ({
            data: { listProjects: { items: existingTesters = [] } = {} } = {}
        }) => {
            if (existingTesters.length)
                return Promise.reject({
                    reference: 'This reference already exists'
                });
        }
    );
