import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// Local
import { AddNewClient, ClientEditModal } from 'views/Modals';
import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    SearchInput,
    Link,
    withModal
} from 'components';

// Selectors
import { selectCounties, selectClientList } from 'selectors';

// Actions
import { listClients } from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    projectButton: {
        marginRight: spacing()
    },
    linkGap: {
        marginRight: 5,
        textDecoration: 'none'
    }
}));

const ClientHome = ({
    clients,
    handleAddNewClient,
    handleClientEditModal,
    listClients
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let shouldCancel = false;
        listClients().then(() => !shouldCancel && setLoading(false));

        return () => (shouldCancel = true);
    }, []);

    return (
        <GridContainer alignItems='center'>
            <GridItem md={2}></GridItem>
            <GridItem md={6}>
                <SearchInput placeholder='Search by name or project reference' />
            </GridItem>
            <GridItem md={4} className={c.buttonGridStyle}>
                <Link to='/project/new' className={c.linkGap}>
                    <NavigateButton>Add a new project</NavigateButton>
                </Link>
                <NavigateButton
                    onClick={() => handleAddNewClient()}
                    variant='outlined'
                    color='secondary'
                >
                    Add new client
                </NavigateButton>
            </GridItem>
            <GridItem md={12}>
                <Table
                    action
                    data={clients}
                    page={1}
                    handleEditModal={handleClientEditModal}
                />
            </GridItem>
        </GridContainer>
    );
};

const mapState = state => ({
    clients: selectClientList(state)
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
