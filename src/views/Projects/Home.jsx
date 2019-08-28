import React, { useState, useEffect } from 'react';
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
import { CheckFilterBar } from 'components/FilterComponents';

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
    const [searchInput, setSearchInput] = useState('');
    const [checkFilter, setCheckFilter] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const setFilterValue = e => {
        const filters = [...checkFilter];
        const value = e.target.value;
        const valueIndex = filters.indexOf(value);
        valueIndex === -1 && filters.push(value);
        valueIndex !== -1 && filters.splice(valueIndex, 1);
        setCheckFilter(filters);
        setLoading(true);
        listProjects(filters, searchInput).then(() => setLoading(false));
    };

    const handleSearch = () => {
        setLoading(true);
        listProjects(checkFilter, searchInput).then(() => setLoading(false));
    };


    useEffect(() => {
        let shouldCancel = false;
        listProjects().then(() => !shouldCancel && setLoading(false));

        return () => (shouldCancel = true);
    }, []);

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
                <SearchInput
                    placeholder='Search by name or project reference'
                    handleText={({ target: { value } }) =>
                        setSearchInput(value)
                    }
                    value={searchInput}
                    handleClick={handleSearch}
                />
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <Link to={'/project/new'}>
                    <NavigateButton>Add new project</NavigateButton>
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
