import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Local
import { Typography, makeStyles } from '@material-ui/core';
import {
    GridContainer,
    GridItem,
    Table,
    Link,
    NavigateButton,
    BarLoader,
    PaginationBase
} from 'components';

// Selectors
import { selectClientName, selectClientProjects } from 'selectors';

// Actions
import { fetchClient } from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        display: 'flex',
        justifyContent: 'center'
    },
    linkGap: {
        textDecoration: 'none'
    },
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const ClientSingle = ({
    match: { params: { id = null } = {} } = {},
    name,
    projects,
    fetchClient
}) => {
    const c = useStyles();
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const pageStep = 10;
    const totalPages =
        Math.floor(projects.length / pageStep) +
            !!(projects.length % pageStep) || 1;

    useEffect(() => {
        fetchClient(id).then(() => setLoading(false));
    }, []);

    return (
        <GridContainer alignItems='center'>
            <GridItem md={3} />
            <GridItem md={6} className={c.title}>
                <Typography variant='h4'>{name}</Typography>
            </GridItem>
            <GridItem md={3} className={c.buttonGridStyle}>
                <Link to={`/project/new?client=${id}`} className={c.linkGap}>
                    <NavigateButton>Add a new project</NavigateButton>
                </Link>
            </GridItem>
            <GridItem md={12}>
                {isLoading ? (
                    <BarLoader />
                ) : (
                    <Fragment>
                        <Table
                            action={true}
                            data={projects}
                            page={page}
                            noResultsText='No Projects'
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
    name: selectClientName(state),
    projects: selectClientProjects(state)
});

const mapDispatch = { fetchClient };

const _ClientSingle = connect(
    mapState,
    mapDispatch
)(ClientSingle);

export { _ClientSingle as default, _ClientSingle as ClientSingle };
