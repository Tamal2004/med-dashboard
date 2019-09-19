import API, { graphqlOperation } from '@aws-amplify/api';
import { gql } from 'apollo-boost';

import { client2 } from 'App/client';
import { CheckTesterEmail } from 'graphql/tester';

const composeQuery = async (variables, isPublic) => {
    if (isPublic)
        return await client2.query({
            query: gql(CheckTesterEmail),
            variables
        });
    else
        return await API.graphql(graphqlOperation(CheckTesterEmail, variables));
};

export const checkEmailQuery = async (
    email,
    isPublic,
    pageToken = null,
    firstTime = true
) => {
    if (firstTime || pageToken) {
        const variables = {
            filter: { email: { eq: email } },
            ...(pageToken ? { nextToken: pageToken } : {})
        };
        const {
            data: {
                listSortedTesters: {
                    items: existingTesters = [],
                    nextToken
                } = {},
                error = null
            } = {}
        } = await composeQuery(variables, isPublic);

        if (!error) {
            if (!!existingTesters.length) {
                return Promise.reject({
                    email: 'This email already exists'
                });
            }
        } else
            return Promise.reject({
                email: 'Error while checking'
            });

        return checkEmailQuery(email, isPublic, nextToken, false);
    }
};
