import API, { graphqlOperation } from '@aws-amplify/api';

import { validateRequired, checkEmailQuery } from 'libs';
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

export const asyncValidate = async ({ email, isPublicUser }) => {
    return await checkEmailQuery(email, isPublicUser);
};
