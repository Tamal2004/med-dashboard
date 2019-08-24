import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    SearchInput,
    BarLoader
} from 'components';

// Selectors
import { selectProjectList } from 'selectors';

// Actions
import { listProjects } from 'actions';

const useStyles = makeStyles(theme => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const ProjectHome = ({ projects, listProjects }) => {
    const c = useStyles();

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        listProjects().then(() => setLoading(false));
    }, []);
    return (
        <GridContainer alignItems='center'>
            <GridItem md={4} />
            <GridItem md={4}>
                <SearchInput placeholder='Search by name or project reference' />
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <Link to={'/project/new'}>
                    <NavigateButton variant='outlined'>
                        Add new project
                    </NavigateButton>
                </Link>
            </GridItem>
            <GridItem md={12}>
                {isLoading ? <BarLoader /> : <Table data={projects} page={1} />}
            </GridItem>
        </GridContainer>
    );
};

const mapState = state => ({
    projects: selectProjectList(state)
});

const mapDispatch = { listProjects };

const _ProjectHome = connect(
    mapState,
    mapDispatch
)(ProjectHome);

export { _ProjectHome as default, _ProjectHome as ProjectHome };
