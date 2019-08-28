import React, { Fragment, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// Components
import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    withModal,
    BarLoader
} from 'components';

// Selectors
import { selectTesterList } from 'selectors';

// Actions
import { listTesters } from 'actions';

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

const TesterHome = ({ testers, listTesters }) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        listTesters().then(() => setLoading(false));
    }, []);

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
                        <NavigateButton variant='outlined' color='secondary'>
                            Add a new tester
                        </NavigateButton>
                    </Link>
                </GridItem>
            </GridWrapper>

            <GridWrapper>
                <GridItem md={12}>
                    {isLoading ? (
                        <BarLoader />
                    ) : (
                        <Table
                            data={testers}
                            page={1}
                        />
                    )}
                </GridItem>
            </GridWrapper>
        </Fragment>
    );
};

const mapState = (state) => ({
    testers: selectTesterList(state)
});



const mapDispatch = {
    listTesters
};

const _TesterHome = compose(
    connect(
        mapState,
        mapDispatch
    ),
)(TesterHome);

export { _TesterHome as default, _TesterHome as TesterHome };
