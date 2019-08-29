import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Local
import { Typography, makeStyles } from '@material-ui/core';
import {
    GridContainer,
    GridItem,
    Table,
    Link,
    NavigateButton
} from 'components';

// Selectors
import { selectClientName, selectClientProjects} from 'selectors';

// Actions
import { fetchClient } from 'actions';

const useStyles = makeStyles(
    ({ breakpoints, shadows, shape, palette, spacing }) => ({
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
    })
);

const ClientSingle = ({
    match: { params: { id = null } = {} } = {},
    name,
    clients,
    fetchClient
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchClient(id).then(() => setLoading(false));
    });

    return (
            <GridContainer alignItems='center'>
                <GridItem md={3} />
                <GridItem md={6} className={c.title}>
                    <Typography variant='h3'>{name}</Typography>
                </GridItem>
                <GridItem md={3} className={c.buttonGridStyle}>
                    <Link to='/project/new' className={c.linkGap}>
                        <NavigateButton>Add a new project</NavigateButton>
                    </Link>
                </GridItem>
                <GridItem md={12}>
                    <Table action={true} data={clients} page={1} noResultsText='No Projects'/>
                </GridItem>
            </GridContainer>
    );
};

const mapState = state => ({
    name: selectClientName(state),
    clients: selectClientProjects(state)
});

const mapDispatch = { fetchClient };

const _ClientSingle = connect(
    mapState,
    mapDispatch
)(ClientSingle);

export { _ClientSingle as default, _ClientSingle as ClientSingle };
