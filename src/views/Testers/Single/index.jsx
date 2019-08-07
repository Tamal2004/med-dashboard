import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RequestIcon from '@material-ui/icons/Autorenew';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import { EditableCard } from './EditableCard';
import { IconedButton } from './IconedButton';
import TesterDetails from './TesterDetails';
import ContactDetails from './ContactDetails';
import EmploymentDetails from './EmploymentDetails';
import TestSessions from './TestSessions';
import {
    GridContainer,
    GridItem,
    Table,
    TooltipIcon,
    Select,
    Input,
    MultiInput,
    Switch,
    NavigateButton
} from 'components';

// Selectors
import {
    selectCounties,
    selectEducationStages,
    selectEmployeeCounts,
    selectEmploymentSectors,
    selectEmploymentStatuses,
    selectEthnicities,
    selectGenders,
    selectMaritalStatuses,
    selectNationalities,
    selectTitles
} from 'selectors';

const TesterSingle = ({ match, genders }) => {
    const c = useStyles();
    return (
        <Fragment>
            <GridContainer className={c.root} alignItems='flex-start'>
                <GridItem md={6}>
                    <TesterDetails />
                </GridItem>
                <Grid item md={6}>
                    <GridItem md={12}>
                        <ContactDetails />
                    </GridItem>
                    <GridItem md={12}><EmploymentDetails /></GridItem>
                </Grid>
            </GridContainer>

            <GridContainer className={c.root} alignItems='center'>
                <GridItem md={12}><TestSessions /></GridItem>
            </GridContainer>
        </Fragment>
    );
};

const mapState = state => ({
    genders: selectGenders(state)
});

const mapDispatch = {};

const validate = (values, { isStudent, isEmployed, hasManualAddress }) => {
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
        'selfInfo',
        'employmentStatus'
    ];

    if (isStudent) {
        required.push('subject');
        required.push('educationStage');
        required.push('institution');
    }
    if (isEmployed) required.push('employeeCount');
    if (!hasManualAddress) required.push('address');

    return { ...validateRequired(values, required) };
};

const _TesterSingle = compose(
    connect(
        mapState,
        mapDispatch
    )
)(TesterSingle);

export { _TesterSingle as default, _TesterSingle as TesterSingle };
