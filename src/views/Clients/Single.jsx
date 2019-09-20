import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Local
import { Typography, makeStyles } from '@material-ui/core';
import { ConfirmationModal } from 'views/Modals';
import {
    GridContainer,
    GridItem,
    Table,
    Link,
    NavigateButton,
    BarLoader,
    PaginationBase,
    withModal
} from 'components';

// Selectors
import { selectClientName, selectClientProjects } from 'selectors';

// Actions
import { fetchClient, removeClient } from 'actions';

const useStyles = makeStyles(({ spacing, palette }) => ({
    header: {
        paddingTop: spacing(2)
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        display: 'flex',
        justifyContent: 'flex-start',
        textTransform: 'uppercase'
    },
    titleTypography: {
        fontWeight: 700
    },
    linkGap: {
        textDecoration: 'none'
    },
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    },
    clientDelete: {
        backgroundColor: palette.error.main,
        marginRight: spacing(1.5),
        '&:hover': {
            backgroundColor: palette.error.dark
        }
    }
}));

const ClientSingle = ({
    match: { params: { id = null } = {} } = {},
    name,
    projects,
    fetchClient,
    handleConfirmationModal,
    removeClient
}) => {
    const c = useStyles();
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const pageStep = 10;
    const totalPages =
        Math.floor(projects.length / pageStep) +
            !!(projects.length % pageStep) || 1;

    useEffect(() => {
        let cancelled = false;
        fetchClient(id).then(() => !cancelled && setLoading(false));
        return () => (cancelled = true);
        // eslint-disable-next-line
    }, []);

    const confirmationProps = {
        title: 'Confirmation',
        promptText: `Are you sure you want to delete this client?`,
        cancelText: 'Cancel',
        submitText: 'Delete',
        onSubmit: () => removeClient(id)
    };

    return (
        <GridContainer alignItems='center' className={c.header}>
            <GridItem md={6} className={c.title}>
                <Typography
                    className={c.titleTypography}
                    variant='h6'
                    align='left'
                >
                    {name}
                </Typography>
            </GridItem>
            <GridItem md={6} className={c.buttonGridStyle}>
                <NavigateButton
                    className={c.clientDelete}
                    color='secondary'
                    onClick={() => handleConfirmationModal(confirmationProps)}
                >
                    Delete Client
                </NavigateButton>
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
                        {!!projects.length && (
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
    name: selectClientName(state),
    projects: selectClientProjects(state)
});

const mapDispatch = { fetchClient, removeClient };

const mapModal = { handleConfirmationModal: ConfirmationModal };

const _ClientSingle = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(ClientSingle);

export { _ClientSingle as default, _ClientSingle as ClientSingle };
