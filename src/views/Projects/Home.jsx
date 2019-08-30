import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    SearchInput,
    BarLoader,
    PaginationBase
} from 'components';

// Selectors
import { selectProjectList } from 'selectors';
import { CheckFilterBar } from 'components/FilterComponents';

// Actions
import { listProjects } from 'actions';

const useStyles = makeStyles(({ spacing })=> ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
    }
}));

const ProjectHome = ({ projects, listProjects }) => {
    const c = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const [checkFilter, setCheckFilter] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const pageStep = 10;
    const totalPages =
        Math.floor(projects.length / pageStep) +
            !!(projects.length % pageStep) || 1;

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

    useEffect(() => {
        let shouldCancel = false;
        listProjects().then(() => !shouldCancel && setLoading(false));

        return () => (shouldCancel = true);
    }, []);

    const handleSearch = () => {
        setLoading(true);
        listProjects(checkFilter, searchInput).then(() => setLoading(false));
    };

    return (
        <GridContainer alignItems='center'>
            <GridItem md={4}>
                <CheckFilterBar
                    data={['Completed', 'In Progress', 'Pending', 'Cancelled']}
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
                {isLoading ? (
                    <BarLoader />
                ) : (
                    <Fragment>
                        <Table
                            data={projects}
                            page={page}
                            noResultText='No Projects'
                            itemsPerPage={pageStep}
                        />
                        {!!projects.length && <div className={c.footer}>
                            <PaginationBase
                                handlePage={page => setPage(page)}
                                totalPages={totalPages}
                            />
                        </div>}
                    </Fragment>
                )}
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
