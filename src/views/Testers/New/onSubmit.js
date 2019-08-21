export default async (
    values,
    dispatch,
    { isStudent, isEmployed, createTester }
) => {
    const { manualAddress, termsChecked, ...pruned } = values;

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

    const tester = { ...pruned, ...address, ...employment };
    return createTester(tester);
};
