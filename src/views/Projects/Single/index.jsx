import React, { Fragment } from 'react';

// Material
import { makeStyles } from '@material-ui/core';

// Local
import { validateRequired } from 'libs';
import TesterDetails from './TesterDetails';
import ContactDetails from './ContactDetails';
import EmploymentDetails from './EmploymentDetails';
import TestSessions from './TestSessions';
import ContactNotes from './ContactNotes';
import { GridContainer, GridItem } from 'components';

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

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'unset'
    }
}));

const ProjectSingle = ({ match }) => {
    const c = useStyles();
    return (
        <Fragment>
            <GridContainer className={c.root} alignItems='flex-start'>
                <GridItem md={6}>
                    <TesterDetails />
                </GridItem>
                <GridItem md={6}>
                    <GridItem md={12}>
                        <ContactDetails />
                    </GridItem>
                    <GridItem md={12}>
                        <EmploymentDetails />
                    </GridItem>
                </GridItem>
            </GridContainer>

            <GridContainer className={c.root} alignItems='center'>
                <GridItem md={12}>
                    <TestSessions />
                </GridItem>
            </GridContainer>
            <GridContainer className={c.root} alignItems='center'>
                <GridItem md={12}>
                    <ContactNotes />
                </GridItem>
            </GridContainer>
        </Fragment>
    );
};


export { ProjectSingle as default, ProjectSingle };
