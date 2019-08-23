import API, { graphqlOperation } from '@aws-amplify/api';

import { validateRequired } from 'libs';
import { CheckTesterEmail } from 'graphql/tester';

export const validate = (
    values,
    { isStudent, isEmployed, hasManualAddress }
) => {
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
        'termsChecked'
    ];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');

    if (hasManualAddress) required.push('country');
    else required.push('address');

    return { ...validateRequired(values, required) };
};

export const asyncValidate = ({ email }) =>
    API.graphql(
        graphqlOperation(CheckTesterEmail, {
            filter: { email: { eq: email } }
        })
    ).then(
        ({
            data: { listTesters: { items: existingTesters = [] } = {} } = {}
        }) => {
            if (existingTesters.length)
                throw { email: 'This email already exists' };
        }
    );
