import { serializeDate, deserializeDate } from 'libs';

// Actions
import { createTester } from 'actions';

export default async (values, dispatch, { isStudent, isEmployed }) => {
    const { manualAddress, termsChecked, dob, hasChildren, ...pruned } = values;

    let address = {};
    if (manualAddress) {
        address = { address: null };
    } else {
        address = {
            house: null,
            street: null,
            town: null,
            county: null,
            postcode: null,
            country: null
        };
    }

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
        ...address,
        ...employment,
        dob: serializeDate(dob),
        hasChildren: hasChildren === 'Yes',
        lastUpdated: serializeDate(deserializeDate(new Date())) // Today
    };

    return dispatch(createTester(tester));
};
