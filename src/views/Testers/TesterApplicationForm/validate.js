import { validateRequired } from 'libs';

export default (values, { isStudent, isEmployed, hasManualAddress }) => {
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
