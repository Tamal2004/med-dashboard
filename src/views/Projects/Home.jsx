import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    SearchInput
} from 'components';

// Selectors
import { selectCounties } from 'selectors';

// Actions
import { fetchProjects } from 'actions';

const useStyles = makeStyles(theme => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const MondayProjects = ({ data, weekday }) => {
    return (
        <Fragment>
            <div>Table for Monday projects</div>
            <Table data={data} page={1} />
        </Fragment>
    );
};

const ProjectHome = ({ location, projects, fetchProjects }) => {
    const c = useStyles();
    useEffect(() => {
        fetchProjects();
    }, []);
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('weekday');

    return (
        <GridContainer alignItems='center'>
            <GridItem md={4}></GridItem>
            <GridItem md={4}>
                <SearchInput placeholder='Search by name or project reference' />
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <Link to={{ pathname: '/project', search: '?weekday=monday' }}>
                    <NavigateButton variant='outlined'>
                        List projects for Monday morning
                    </NavigateButton>
                </Link>
            </GridItem>
            <GridItem md={12}>
                {queryParam ? (
                    <MondayProjects data={projects} weekday={queryParam} />
                ) : (
                    <Table data={projects} page={1} />
                )}
            </GridItem>
        </GridContainer>
    );
};
const generateProjects = (
    client,
    project,
    date = '07/04/2018',
    contactDate = '02/06/2019'
) => ({
    'Project Reference': {
        Component: <Link to={`/project/${project}`}>{project}</Link>,
        value: project
    },
    Client: {
        Component: <Link to={`/client/${client}`}>{client}</Link>,
        value: client
    },
    'Project Name': 'Aldi',
    'Testing Date': contactDate
});

const mapState = state => ({
    projects: Array.range(0, 3)
        .map(() => [
            generateProjects('Aldi', 'EM21'),
            generateProjects('Wessex Water', 'GM33', '03/09/2018'),
            generateProjects('Disney', 'JE24', '03/09/2018', '08/12/2018')
        ])
        .flatMap(x => x)
});

const mapDispatch = { fetchProjects };

const _ProjectHome = connect(
    mapState,
    mapDispatch
)(ProjectHome);

export { _ProjectHome as default, _ProjectHome as ProjectHome };
