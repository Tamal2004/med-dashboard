import React, { Fragment } from 'react';

// Material
import { makeStyles } from '@material-ui/core';

// Local
import { validateRequired } from 'libs';
import ProjectDetails from './ProjectDetails';
import ProjectManagement from './ProjectManagement';
import ClientFeedback from './ClientFeedback';
import TesterDetails from './TesterDetails';
import ProfileDetails from './ProfileDetails';
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
                    <GridItem md={12}>
                        <ProjectDetails />
                    </GridItem>
                    <GridItem md={12}>
                        <ProfileDetails />
                    </GridItem>
                </GridItem>
                <GridItem md={6}>
                    <GridItem md={12}>
                        <ProjectManagement />
                    </GridItem>
                    <GridItem md={12}>
                        <ClientFeedback />
                    </GridItem>
                </GridItem>
            </GridContainer>

            <GridContainer className={c.root} alignItems='center'>
                <GridItem md={12}>
                    <TesterDetails />
                </GridItem>
            </GridContainer>
        </Fragment>
    );
};

export { ProjectSingle as default, ProjectSingle };
