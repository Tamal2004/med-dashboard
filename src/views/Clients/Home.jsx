import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { makeStyles, LinearProgress } from '@material-ui/core';

// Local
import { AddNewClient, ClientEditModal } from 'views/Modals';
import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    SearchInput,
    BarLoader,
    withModal,
    PaginationBase
} from 'components';

// Selectors
import { selectClientList, selectAreClientsSearching } from 'selectors';

// Actions
import { listClients } from 'actions';

const useStyles = makeStyles(({ shape, spacing }) => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    projectButton: {
        marginRight: spacing()
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    loader: {
        marginTop: spacing(-0.5),
        borderBottomLeftRadius: shape.borderRadius,
        borderBottomRightRadius: shape.borderRadius
    }
}));

const ClientHome = ({
    clients,
    handleAddNewClient,
    handleClientEditModal,
    listClients,
    isSearching
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const pageStep = 10;
    const totalPages =
        Math.floor(clients.length / pageStep) + !!(clients.length % pageStep) ||
        1;

    useEffect(() => {
        let shouldCancel = false;
        listClients().then(() => !shouldCancel && setLoading(false));

        return () => (shouldCancel = true);
        /*eslint-disable-next-line*/
    }, []);

    const handleSearch = search => {
        setLoading(true);
        listClients(search).then(() => setLoading(false));
    };

    return (
        <GridContainer alignItems='center'>
            <GridItem md={4} />
            <GridItem md={4}>
                <SearchInput
                    placeholder='Search by client name'
                    handleClick={handleSearch}
                />
                {isSearching && <LinearProgress className={c.loader} />}
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <NavigateButton
                    onClick={() => handleAddNewClient()}
                    variant='outlined'
                    color='primary'
                >
                    Add new client
                </NavigateButton>
            </GridItem>
            <GridItem md={12}>
                {isLoading ? (
                    <BarLoader />
                ) : (
                    <Fragment>
                        <Table
                            action
                            data={clients}
                            page={page}
                            handleEditModal={handleClientEditModal}
                            noResultsText='No Clients'
                        />
                        {!!clients.length && (
                            <div className={c.footer}>
                                <PaginationBase
                                    handlePage={page => setPage(page)}
                                    totalPages={totalPages}
                                />
                            </div>
                        )}
                    </Fragment>
                )}
            </GridItem>
        </GridContainer>
    );
};

const mapState = state => ({
    clients: selectClientList(state),
    isSearching: selectAreClientsSearching(state)
});

const mapDispatch = { listClients };

const mapModal = {
    handleAddNewClient: AddNewClient,
    handleClientEditModal: ClientEditModal
};

const _ClientHome = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(ClientHome);

export { _ClientHome as default, _ClientHome as ClientHome };
