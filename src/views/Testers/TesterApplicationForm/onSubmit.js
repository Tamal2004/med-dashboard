import { serializeDate, deserializeDate } from 'libs';

// Actions
import { createTester, createPublicTester } from 'actions';

export default async (values, dispatch, { isStudent, isEmployed, reset }) => {
    const {
        manualAddress,
        termsChecked,
        dob,
        isPublicUser,
        hasChildren,
        ...pruned
    } = values;

    const regularEmployment = {
        jobTitle: null,
        businessName: null,
        employmentSector: null,
        employeeCount: null
    };

    const studentEmployment = {
        subject: null,
        educationStage: null,
        institution: null
    };

    // Unemployed
    let employment = {
        ...regularEmployment,
        ...studentEmployment
    };
    if (isStudent) employment = { ...regularEmployment };
    else if (isEmployed) employment = { ...studentEmployment };

    const tester = {
        ...pruned,
        ...employment,
        dob: serializeDate(dob),
        hasChildren: hasChildren === 'Yes',
        lastUpdated: serializeDate(deserializeDate(new Date())) // Today
    };
    const Action = isPublicUser
        ? createPublicTester(tester)
        : createTester(tester);

    return dispatch(Action).then(() => reset());
};
