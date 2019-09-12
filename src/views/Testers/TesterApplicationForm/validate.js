import API, { graphqlOperation } from '@aws-amplify/api';

import { validateRequired } from 'libs';
import { CheckTesterEmail } from 'graphql/tester';
import { client2 } from '../../../App/client';
import { gql } from 'apollo-boost';

export const validate = (values, { isStudent, isEmployed, isTester }) => {
    const required = [
        'title',
        'firstName',
        'surname',
        'email',
        'phone',
        'gender',
        'age',
        'dob',
        'maritalStatus',
        'nationality',
        'ethnicity',
        'about',
        'employmentStatus',
        'hasChildren',
        'firstLanguage',
        'town',
        'country'
    ];

    if (isTester) required.push('termsChecked');

    if (isStudent) required.push('subject', 'educationStage', 'institution');

    if (isEmployed) required.push('employeeCount');

    return { ...validateRequired(values, required) };
};

export const asyncValidate = ({ email, isPublicUser }) => {
    if (isPublicUser) {
        return client2
            .query({
                query: gql(CheckTesterEmail),
                variables: {
                    filter: { email: { eq: email } }
                }
            })
            .then(
                ({
                    data: {
                        listTesters: { items: existingTesters = [] } = {}
                    } = {}
                }) => {
                    if (existingTesters.length)
                        return Promise.reject({
                            email: 'This email already exists'
                        });
                }
            );
    } else {
        return API.graphql(
            graphqlOperation(CheckTesterEmail, {
                filter: { email: { eq: email } }
            })
        ).then(
            ({
                data: { listTesters: { items: existingTesters = [] } = {} } = {}
            }) => {
                if (existingTesters.length)
                    return Promise.reject({
                        email: 'This email already exists'
                    });
            }
        );
    }
};
