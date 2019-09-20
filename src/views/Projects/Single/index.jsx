import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Material
import { makeStyles } from '@material-ui/core';

// Local
import ProjectDetails from './ProjectDetails';
import ProjectManagement from './ProjectManagement';
import ClientFeedback from './ClientFeedback';
import TesterDetails from './TesterDetails';
import ProfileDetails from './ProfileDetails';
import { GridContainer, GridItem, BarLoader } from 'components';

// Actions
import { fetchProject } from 'actions';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'unset'
    }
}));

const ProjectSingle = ({
    match: { params: { id = null } = {} } = {},
    fetchProject
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        fetchProject(id).then(() => !cancelled && setLoading(false));
        return () => (cancelled = true);
    });

    return (
        <Fragment>
            {isLoading ? (
                <BarLoader fullScreen />
            ) : (
                <Fragment>
                    <GridContainer className={c.root} alignItems='flex-start'>
                        <GridItem md={6} sm={12}>
                            <GridItem md={12} sm={12}>
                                <ProjectDetails />
                            </GridItem>
                            <GridItem md={12} sm={12}>
                                <ProfileDetails />
                            </GridItem>
                        </GridItem>
                        <GridItem md={6} sm={12}>
                            <GridItem md={12} sm={12}>
                                <ProjectManagement />
                            </GridItem>
                            <GridItem md={12} sm={12}>
                                <ClientFeedback />
                            </GridItem>
                        </GridItem>
                    </GridContainer>

                    <GridContainer className={c.root} alignItems='center'>
                        <GridItem md={12} sm={12}>
                            <TesterDetails />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapDispatch = { fetchProject };

const _ProjectSingle = connect(
    void 0,
    mapDispatch
)(ProjectSingle);

export { _ProjectSingle as default, _ProjectSingle as ProjectSingle };
