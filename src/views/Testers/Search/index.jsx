import React, { Fragment, useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
    selectTestersSearchInfo
} from 'selectors';

// Actions
import { listTestersSearch, mailTesters } from 'actions';

const useStyles = makeStyles(({ spacing }) => ({
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

const TesterSearch = ({
    testers,
    handleMailModal,
    listTestersSearch,
    userEmail,
    testersInfo,
    mailTesters
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

    const { addresses, ids } = selectedTesters.reduce(
        (acm, testerIdx) => ({
            ids: [...acm.ids, testersInfo[testerIdx].id],
            addresses: [...acm.addresses, testersInfo[testerIdx].email]
        }),
        {
            addresses: [],
            ids: []
        }
    );

    const mailProps = {
        from: userEmail,
        to: addresses,
        handleMail: mail => mailTesters(mail, ids),
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
                    <SearchInput
                        placeholder='Search by Tester Name, Email or Town'
                        handleClick={handleSearch}
                        handleChange={value => setInput(value)}
                    />
                </GridItem>
                <GridItem md={3}>
                    <div className={c.filterButtonWrapper}>
                        <NavigateButton
                            onClick={() => handleMailModal(mailProps)}
                            disabled={!selectedTesters.length}
                        >
                            Email Testers
                        </NavigateButton>
                    </div>
                </GridItem>
            </GridWrapper>

            <GridWrapper className={c.filterGridWrapper}>
                <GridItem md={3}>
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
    testers: selectTestersSearch(state),
    testersInfo: selectTestersSearchInfo(state),
    userEmail: selectEmail(state)
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
