import React, { Fragment, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';

// Material
import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpRounded';

// Local
import { SearchFilter } from './SearchFilter';

import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    SearchInput,
    withModal,
    BarLoader,
    PaginationBase,
    Tooltip
} from 'components';
import { MailModal } from 'views/Modals';

// Selectors
import {
    selectTesterResults,
    selectEmail,
    selectTestersSearchInfo,
    selectAreTestersSearching,
    selectFilters,
    selectPage,
    selectSortIndex
} from 'selectors';

// Actions
import {
    listTestersSearch,
    mailTesters,
    setPage,
    setSortIndex,
    resetFilters
} from 'actions';

const useStyles = makeStyles(({ shape, spacing, typography }) => ({
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
    emailButtonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchButtonWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    searchButtonRoot: {
        width: '100%',
        height: spacing(6)
    },
    searchButtonContainer: {
        marginBottom: spacing()
    },
    footer: {
        marginTop: spacing(3)
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center'
    },
    total: {
        display: 'flex'
    },
    totalText: {
        fontWeight: typography.fontWeightBold,
        alignSelf: 'center',
        paddingLeft: spacing()
    },
    loader: {
        marginTop: spacing(-0.5),
        borderBottomLeftRadius: shape.borderRadius,
        borderBottomRightRadius: shape.borderRadius
    },
    searchWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    search: { width: '95%' },
    tooltip: { width: '5%', display: 'flex', marginLeft: spacing() }
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

const TesterSearch = ({
    testers,
    handleMailModal,
    listTestersSearch,
    userEmail,
    testersInfo,
    mailTesters,
    isSearching,
    filters,
    page,
    setPage,
    sortIndex,
    setSortIndex,
    resetFilters
}) => {
    const c = useStyles();
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [selectedTesters, setSelectedTesters] = useState([]);

    const pageStep = 10;
    const totalPages =
        Math.floor(testers.length / pageStep) + !!(testers.length % pageStep) ||
        1;

    const handleFilter = async () => {
        setLoading(true);
        await listTestersSearch(filters, input);
        setPage(1);
        setLoading(false);
    };

    const handleSearch = async text => {
        setInput(text);
        setLoading(true);
        await listTestersSearch(filters, text);
        setPage(1);
        setLoading(false);
    };

    const { addresses, mailData } = selectedTesters.reduce(
        (acm, testerIdx) =>
            testersInfo[testerIdx]
                ? {
                      mailData: [
                          ...acm.mailData,
                          {
                              id: testersInfo[testerIdx].id,
                              email: testersInfo[testerIdx].email
                          }
                      ],
                      addresses: [
                          ...acm.addresses,
                          testersInfo[testerIdx].email
                      ]
                  }
                : acm,
        {
            addresses: [],
            mailData: []
        }
    );

    const mailProps = {
        from: userEmail,
        to: addresses,
        handleMail: (mail, setLoading) =>
            mailTesters(mail, mailData, setLoading),
        needsProject: true,
        needsContactType: true
    };

    // Inject Check Action handle
    const composedTesters = testers.map(tester => ({
        ...tester,
        actions: {
            checkAction: value => setSelectedTesters(value)
        }
    }));

    return (
        <Fragment>
            <GridWrapper>
                <GridItem md={3} />
                <GridItem md={6}>
                    <div className={c.searchWrapper}>
                        <div className={c.search}>
                            <SearchInput
                                placeholder='Search by Tester Name, Email or Town'
                                handleClick={handleSearch}
                                handleChange={value => setInput(value)}
                            />
                            {isSearching && (
                                <LinearProgress className={c.loader} />
                            )}
                        </div>
                        <div className={c.tooltip}>
                            <Tooltip
                                title="All words separated by 'or' are simultaneously searched!"
                                dark
                                placement='right'
                            >
                                <HelpIcon color='secondary' />
                            </Tooltip>
                        </div>
                    </div>
                </GridItem>
                <GridItem md={3} className={c.emailButtonWrapper}>
                    <NavigateButton
                        onClick={() => handleMailModal(mailProps)}
                        disabled={!selectedTesters.length}
                    >
                        Email Testers
                    </NavigateButton>
                </GridItem>
            </GridWrapper>

            <GridWrapper className={c.filterGridWrapper}>
                <GridItem md={3}>
                    <NavigateButton
                        styles={{
                            container: c.searchButtonContainer,
                            root: c.searchButtonRoot
                        }}
                        color='primary'
                        onClick={handleFilter}
                    >
                        Filter
                    </NavigateButton>
                    <NavigateButton
                        styles={{
                            container: c.searchButtonContainer,
                            root: c.searchButtonRoot
                        }}
                        color='secondary'
                        onClick={() => resetFilters()}
                    >
                        Reset
                    </NavigateButton>
                    <SearchFilter />
                </GridItem>
                <GridItem md={9}>
                    {isLoading ? (
                        <BarLoader fullScreen />
                    ) : (
                        <Fragment>
                            <Table
                                data={composedTesters}
                                page={page}
                                noResultText='No Testers'
                                itemsPerPage={pageStep}
                                checkAll={value => setSelectedTesters(value)}
                                sortIndex={sortIndex}
                                handleSortIndex={idx => setSortIndex(idx)}
                            />
                            {!!testers.length && (
                                <GridContainer className={c.footer}>
                                    <GridItem md={3} className={c.total}>
                                        <Typography
                                            variant='subtitle1'
                                            className={c.totalText}
                                        >
                                            {`Total Items: ${testers.length}`}
                                        </Typography>
                                    </GridItem>
                                    <GridItem md={6} className={c.pagination}>
                                        <PaginationBase
                                            page={page}
                                            handlePage={page => setPage(page)}
                                            totalPages={totalPages}
                                            items
                                        />
                                    </GridItem>
                                    <GridItem md={3} />
                                </GridContainer>
                            )}
                        </Fragment>
                    )}
                </GridItem>
            </GridWrapper>
        </Fragment>
    );
};

const mapState = state => ({
    testers: selectTesterResults(state),
    testersInfo: selectTestersSearchInfo(state),
    userEmail: selectEmail(state),
    isSearching: selectAreTestersSearching(state),
    filters: selectFilters(state),
    page: selectPage(state),
    sortIndex: selectSortIndex(state)
});

const mapDispatch = {
    listTestersSearch,
    mailTesters,
    setPage,
    setSortIndex,
    resetFilters
};

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
