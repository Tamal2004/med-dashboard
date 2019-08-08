import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';


// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
    Select,
    Input,
    EditableCard,
    EditableFooter
} from 'components';

// Selectors
import {
    selectEducationStages,
    selectEmployeeCounts,
    selectEmploymentSectors,
    selectEmploymentStatuses
} from 'selectors';

const EmploymentDetails = ({
    educationStages,
    employeeCounts,
    employmentSectors,
    employmentStatuses,
    isStudent,
    isEmployed,
    isRetired
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();
    return (
        <EditableCard
            title='Employment Details'
            onEdit={() => setEditing(!isEditing)}
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
                <EditableFooter onClick={() => setEditing(!isEditing)} />
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
        educationStages: selectEducationStages(state),
        employeeCounts: selectEmployeeCounts(state),
        employmentSectors: selectEmploymentSectors(state),
        employmentStatuses: selectEmploymentStatuses(state),
        isStudent: employmentStatus === 5,
        isEmployed:
            employmentStatus === 2 ||
            employmentStatus === 3 ||
            employmentStatus === 4,
        isRetired: employmentStatus === 4
    };
};

const mapDispatch = {};

const validate = (values, { isStudent, isEmployed }) => {
    const required = [
        'employmentStatus'
    ];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');

    return { ...validateRequired(values, required) };
};

const _EmploymentDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'EmploymentDetails',
        validate
    })
)(EmploymentDetails);

export {
    _EmploymentDetails as default,
    _EmploymentDetails as EmploymentDetails
};
