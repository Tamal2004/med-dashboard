import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Local
import { validateRequired } from 'libs';
import { Select, Input, EditableCard, EditableFooter } from 'components';

// Selectors
import {
    selectTesterId,
    selectEducationStages,
    selectEmployeeCounts,
    selectEmploymentSectors,
    selectEmploymentStatuses
} from 'selectors';

// Actions
import { updateTester } from 'actions';

const EmploymentDetails = ({
    educationStages,
    employeeCounts,
    employmentSectors,
    employmentStatuses,
    isStudent,
    isEmployed,
    isRetired,
    invalid,
    reset,
    handleSubmit
}) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <EditableCard
            title='Employment Details'
            onEdit={() => {
                if (isEditing) reset();
                setEditing(!isEditing);
            }}
            isEditing={isEditing}
            color={isEditing ? 'primary' : 'secondary'}
        >
            <Select
                label='Employment Status'
                name='employmentStatus'
                data={employmentStatuses}
                isCard
                active={isEditing}
                required={isEditing}
            />
            {isEmployed && (
                <Fragment>
                    <Input
                        label={`${isRetired ? 'Last ' : ''}Job Title`}
                        name='jobTitle'
                        isCard
                        active={isEditing}
                    />
                    <Input
                        label={`${isRetired ? 'Last ' : ''}Business Name`}
                        name='businessName'
                        isCard
                        active={isEditing}
                    />
                    <Select
                        label={`${isRetired ? "Last Job's " : ''}Sector`}
                        data={employmentSectors}
                        name='employmentSector'
                        isCard
                        active={isEditing}
                    />
                    <Select
                        label={`${
                            isRetired ? "Last Job's " : ''
                        }Number of Employees`}
                        data={employeeCounts}
                        name='employeeCount'
                        isCard
                        active={isEditing}
                        required={isEditing}
                    />
                </Fragment>
            )}
            {isStudent && (
                <Fragment>
                    <Input
                        label='Subject Area'
                        name='subject'
                        isCard
                        active={isEditing}
                        required={isEditing}
                    />
                    <Select
                        label='Stage'
                        data={educationStages}
                        name='educationStage'
                        isCard
                        active={isEditing}
                        required={isEditing}
                    />
                    <Input
                        label='Institution'
                        name='institution'
                        isCard
                        active={isEditing}
                        required={isEditing}
                    />
                </Fragment>
            )}
            {isEditing && (
                <EditableFooter
                    onClick={() => {
                        if (isEditing) handleSubmit();
                        setEditing(!isEditing);
                    }}
                    disabled={invalid}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => {
    const employmentStatus = formValueSelector('EmploymentDetails')(
        state,
        'employmentStatus'
    );
    return {
        id: selectTesterId(state),
        educationStages: selectEducationStages(state),
        employeeCounts: selectEmployeeCounts(state),
        employmentSectors: selectEmploymentSectors(state),
        employmentStatuses: selectEmploymentStatuses(state),
        isStudent: employmentStatus === 'Student',
        isEmployed:
            employmentStatus === 'Part-time employment' ||
            employmentStatus === 'Full-time employment' ||
            employmentStatus === 'Retired',
        isRetired: employmentStatus === 'Retired'
    };
};

const mapDispatch = {};

const validate = (values, { isStudent, isEmployed }) => {
    const required = ['employmentStatus'];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');

    return { ...validateRequired(values, required) };
};

const onSubmit = ({ ...values }, dispatch, { id, isStudent, isEmployed }) => {
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
        id,
        ...values,
        ...employment
    };
    return dispatch(updateTester(tester));
};

const _EmploymentDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'EmploymentDetails',
        validate,
        onSubmit
    })
)(EmploymentDetails);

export {
    _EmploymentDetails as default,
    _EmploymentDetails as EmploymentDetails
};
