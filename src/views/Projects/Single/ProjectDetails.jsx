import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

// Material
import { Divider, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RequestIcon from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';

// Local
import { validateRequired, mapFromValue } from 'libs';
import {
    Select,
    Input,
    IconedButton,
    EditableCard,
    EditableFooter
} from 'components';

// Selectors
import //selectProjectStatuses
'selectors';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    name: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        fontWeight: typography.fontWeightHeavy
    },
    divider: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    },
    footer: {
        paddingLeft: spacing(2),
        paddingRight: spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ProjectDetails = ({
    match,
    titles,
    genders,
    martitalStatuses,
    nationalities,
    ethnicities,
    invalid
}) => {
    const [isEditing, setEditing] = useState(false);
    const c = useStyles();

    return (
        <EditableCard
            title='Project Details'
            onEdit={() => setEditing(!isEditing)}
            color={isEditing ? 'primary' : 'secondary'}
        >
            {' '}
            <Input
                label='Project Reference'
                name='reference'
                isCard
                active={isEditing}
                required={isEditing}
            />{' '}
            <Input
                label='Project Title'
                name='title'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Project Status'
                name='status'
                data={[]}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Select
                label='Client'
                name='clientId'
                data={[]}
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Principal Contact'
                name='principalContact'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Other Contact'
                name='otherContacts'
                type='number'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Project Cost'
                name='cost'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Purchase Order Number'
                name='orderNumber'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Divider className={c.divider} />
            <Input
                label='Project Manager'
                name='manager'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Tester Facilitator'
                name='testerFacilitator'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Client Facilitator'
                name='clientFacilitator'
                isCard
                active={isEditing}
                required={isEditing}
            />
            <Input
                label='Main Recruiter'
                name='reqruiter'
                isCard
                active={isEditing}
                required={isEditing}
            />
            {isEditing && (
                <EditableFooter
                    onClick={() => setEditing(!isEditing)}
                    disabled={invalid}
                />
            )}
        </EditableCard>
    );
};

const mapState = state => {
    return {
        //projectStatuses: selectProjectStasuses(state)
    };
};

const mapDispatch = {};

const validate = values => {
    const required = [
        'title',
        'firstName',
        'surname',
        'gender',
        'age',
        'dob',
        'maritalStatus',
        'hasChildren',
        'nationality',
        'ethnicity',
        'firstLanguage',
        'selfInfo'
    ];
    return { ...validateRequired(values, required) };
};

const _ProjectDetails = compose(
    connect(
        mapState,
        mapDispatch
    ),
    reduxForm({
        form: 'ProjectDetails',
        validate
    })
)(ProjectDetails);

export { _ProjectDetails as default, _ProjectDetails as ProjectDetails };
