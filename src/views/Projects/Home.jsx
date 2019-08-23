import React, { useState, useEffect } from 'react';
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
import { CheckFilterBar } from 'components/FilterComponents';

// Actions
import { fetchProjects } from 'actions';

const useStyles = makeStyles(theme => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const ProjectHome = ({ location, projects, fetchProjects }) => {
    const c = useStyles();
    const [checkFilter, setCheckFilter] = useState([]);

    const setFilterValue = e => {
        const temp = [...checkFilter];
        const value = e.target.value;
        const valueIndex = temp.indexOf(value);
        valueIndex === -1 && temp.push(value);
        valueIndex !== -1 && temp.splice(valueIndex, 1);
        setCheckFilter(temp);
    };

    useEffect(() => {
        fetchProjects();
    });

    return (
        <GridContainer alignItems='center'>
            <GridItem md={4}>
                <CheckFilterBar
                    data={['Complete', 'Incomplete']}
                    onChange={e => setFilterValue(e)}
                    checked={checkFilter}
                />
            </GridItem>
            <GridItem md={4}>
                <SearchInput placeholder='Search by name or project reference' />
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <Link to={'/project/new'}>
                    <NavigateButton variant='outlined'>
                        Add New Project
                    </NavigateButton>
                </Link>
            </GridItem>
            <GridItem md={12}>
                <Table data={projects} page={1} />
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
