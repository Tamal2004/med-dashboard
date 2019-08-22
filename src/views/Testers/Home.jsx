import React, { Fragment, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import API, { graphqlOperation } from '@aws-amplify/api';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    withModal
} from 'components';

// Selectors
import { selectCounties } from 'selectors';
import { listBlogs } from 'graphql/queries';
import { selectTesters } from 'selectors';
import { TesterTableEdit } from 'views/Modals';

const useStyles = makeStyles(theme => ({
    gridDistance: {
        marginBottom: 32
    },
    buttonAnchor: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        '& a + a': {
            marginLeft: 10
        }
    }
}));

const GridWrapper = ({ children }) => {
    const c = useStyles();
    return (
        <GridContainer className={c.gridDistance} alignItems='center'>
            {children}
        </GridContainer>
    );
};

async function getBlogs() {
    const blogData = await API.graphql(graphqlOperation(listBlogs));
    console.log('blogData', blogData);
}

const TesterHome = ({ testers, handleEditModal }) => {
    const c = useStyles();
    useEffect(() => {
        getBlogs();
    });

    return (
        <Fragment>
            <GridWrapper>
                <GridItem md={12} className={c.buttonGridStyle}>
                    <Link to={'/tester/search'}>
                        <NavigateButton variant='outlined' color='primary'>
                            Search for a tester
                        </NavigateButton>
                    </Link>
                    <Link to={'/tester/new'}>
                        <NavigateButton color='secondary'>
                            Add a new tester
                        </NavigateButton>
                    </Link>
                </GridItem>
            </GridWrapper>

            <GridWrapper>
                <GridItem md={12}>
                    <Table
                        data={testers}
                        page={1}
                        handleEditModal={handleEditModal}
                    />
                </GridItem>
            </GridWrapper>
        </Fragment>
    );
};

const mapState = (state, ownProps) => ({
    testers: selectTesters(state)
});

const mapModal = {
    handleEditModal: TesterTableEdit
};

const _TesterHome = compose(
    connect(
        mapState,
        null
    ),
    withModal(mapModal)
)(TesterHome);

export { _TesterHome as default, _TesterHome as TesterHome };
