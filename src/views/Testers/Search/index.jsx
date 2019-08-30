import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SearchFilter } from './SearchFilter';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table,
    SearchInput,
    withModal,
    BarLoader,
    PaginationBase
} from 'components';
import { MailModal } from 'views/Modals';

// Selectors
import { selectTestersSearch } from 'selectors';

// Actions
import { listTestersSearch } from 'actions';

const useStyles = makeStyles(({ spacing}) => ({
    gridDistance: {
        marginBottom: spacing(4)
    },
    searchMessage: {
        paddingTop: 5,
        textAlign: 'center'
    },
    filterGridWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    filterButtonWrapper: {
        float: 'right',
        marginBottom: 20
    },
    footer: {
        marginTop: spacing(3),
        display: 'flex',
        justifyContent: 'center'
    }
}));

const GridWrapper = ({ className, children }) => {
    const c = useStyles();
    return (
        <GridContainer
            className={classNames(c.gridDistance, className)}
            alignItems='center'
        >
            {children}
        </GridContainer>
    );
};

const TesterSearch = ({ testers, handleMailModal, listTestersSearch }) => {
    const c = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const pageStep = 10;
    const totalPages =
        Math.floor(testers.length / pageStep) +
            !!(testers.length % pageStep) || 1;

    const testerSearch = (filterValues = {}) => {
    	console.log('from parent', filterValues);

        // setLoading(true);
        // listTestersSearch(searchInput).then(() => setLoading(false));
    };



    return (
        <Fragment>
            <GridWrapper>
                <GridItem md={3} />
                <GridItem md={6}>
                    <SearchInput
                        placeholder='Search by Tester Name or Email'
                        handleText={({ target: { value } }) =>
                            setSearchInput(value)
                        }
                        value={searchInput}
                        handleClick={() => testerSearch()}
                    />
                </GridItem>
                <GridItem md={3}>
                    <div className={c.filterButtonWrapper}>
                        <NavigateButton onClick={() => handleMailModal()}>
                            Email Testers
                        </NavigateButton>
                    </div>
                </GridItem>
            </GridWrapper>

            <GridWrapper className={c.filterGridWrapper}>
                <GridItem md={3}>
                    <SearchFilter handleFilter={testerSearch} />
                </GridItem>
                <GridItem md={9}>
                    {isLoading ? (
                        <BarLoader fullScreen />
                    ) : (
                        <Fragment>
                            <Table
                                data={testers}
                                page={page}
                                noResultText='No Testers'
                                itemsPerPage={pageStep}
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
    testers: selectTestersSearch(state)
});

const mapDispatch = { listTestersSearch };

const mapModal = {
    handleMailModal: MailModal
};

const _TesterSearch = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(TesterSearch);

export { _TesterSearch as default, _TesterSearch as TesterSearch };
