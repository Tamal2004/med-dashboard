import React, { Fragment, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';

// Material
import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { SearchFilter } from './SearchFilter';

import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    SearchInput,
    withModal,
    BarLoader,
    PaginationBase
} from 'components';
import { MailModal } from 'views/Modals';

// Selectors
import {
    selectTestersSearch,
    selectEmail,
    selectTestersSearchInfo,
    selectAreTestersSearching
} from 'selectors';

// Actions
import { listTestersSearch, mailTesters } from 'actions';

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
    searchButton: {
        width: '100%',
        height: spacing(6),
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

const TesterSearch = ({
    testers,
    handleMailModal,
    listTestersSearch,
    userEmail,
    testersInfo,
    mailTesters,
    isSearching
}) => {
    const c = useStyles();
    const [input, setInput] = useState('');
    const [filterCounter, setFilterCounter] = useState(0); // Initial calls
    const [filters, setFilters] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedTesters, setSelectedTesters] = useState([]);

    const pageStep = 10;
    const totalPages =
        Math.floor(testers.length / pageStep) + !!(testers.length % pageStep) ||
        1;

    useEffect(() => {
        if (filterCounter < 3) setFilterCounter(filterCounter + 1);
        else {
            setLoading(true);
            listTestersSearch(filters, input).then(() => {
                setPage(1);
                setLoading(false);
            });
        }
        // eslint-disable-next-line
    }, [filters, input]);

    const handleFilters = filters => {
        setFilters(filters);
    };

    const handleSearch = text => {
        setInput(text);
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
        handleMail: mail => mailTesters(mail, mailData),
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
                <GridItem md={3}/>
                <GridItem md={6}>
                    <SearchInput
                        placeholder='Search by Tester Name, Email or Town'
                        handleClick={handleSearch}
                        handleChange={value => setInput(value)}
                    />
                    {isSearching && <LinearProgress className={c.loader} />}
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
                            className={c.searchButton}
                            color='primary'
                            onClick={() => console.log('haha')}
                            //disabled={!selectedTesters.length}
                        >
                            Run Filters
                        </NavigateButton>
                    <SearchFilter
                        handleFilter={filters => handleFilters(filters)}
                    />
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
    testers: selectTestersSearch(state),
    testersInfo: selectTestersSearchInfo(state),
    userEmail: selectEmail(state),
    isSearching: selectAreTestersSearching(state)
});

const mapDispatch = { listTestersSearch, mailTesters };

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
