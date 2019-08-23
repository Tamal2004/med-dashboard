import { serializeDate, deserializeDate } from 'libs';

export default async (
    values,
    dispatch,
    { isStudent, isEmployed, createTester }
) => {
    const { manualAddress, termsChecked, dob, ...pruned } = values;

    let address = {};
    if (manualAddress) {
        address = { address: undefined };
    } else {
        address = {
            house: undefined,
            street: undefined,
            town: undefined,
            county: undefined,
            postcode: undefined,
            country: undefined
        };
    }

    const regularEmployment = {
        jobTitle: undefined,
        businessName: undefined,
        employmentSector: undefined,
        employeeCount: undefined
    };

    const studentEmployment = {
        subject: undefined,
        educationStage: undefined,
        institution: undefined
    };

    // Unemployed
    let employment = {
        ...regularEmployment,
        ...studentEmployment
    };
    if (isStudent) {
        employment = { ...regularEmployment };
    } else if (isEmployed) {
        employment = { ...studentEmployment };
    }



    const tester = {
        ...pruned,
        ...address,
        ...employment,
        dob: serializeDate(dob),
        lastUpdated: serializeDate(deserializeDate(new Date())) // Today
    };

    return createTester(tester);
};
