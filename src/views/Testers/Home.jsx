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
    BarLoader,
    PaginationBase
} from 'components';

// Selectors
import { selectTesterList } from 'selectors';

// Actions
import { listTesters } from 'actions';

const useStyles = makeStyles(({ palette, spacing }) => ({
    gridDistance: {
        marginBottom: 32
    },
    buttonAnchor: {
        textDecoration: 'none',
        color: palette.primary.main
    },
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        '& a + a': {
            marginLeft: spacing(1.5)
        }
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
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
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const pageStep = 10;
    const totalPages =
        Math.floor(testers.length / pageStep) + !!(testers.length % pageStep) ||
        1;

    useEffect(() => {
        listTesters().then(() => setLoading(false));
    }, [listTesters]);

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
                        <Fragment>
                            <Table
                                data={testers}
                                page={page}
                                noResultsText='No Testers'
                            />
                            {!!testers.length && (
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
            </GridWrapper>
        </Fragment>
    );
};

const mapState = state => ({
    testers: selectTesterList(state)
});

const mapDispatch = {
    listTesters
};

const _TesterHome = compose(
    connect(
        mapState,
        mapDispatch
    )
)(TesterHome);

export { _TesterHome as default, _TesterHome as TesterHome };
