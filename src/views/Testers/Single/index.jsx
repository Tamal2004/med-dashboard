import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Material
import { makeStyles } from '@material-ui/core';

// Local
import TesterDetails from './TesterDetails';
import ContactDetails from './ContactDetails';
import EmploymentDetails from './EmploymentDetails';
import TestSessions from './TestSessions';
import ContactNotes from './ContactNotes';

// Components
import { GridContainer, GridItem, BarLoader } from 'components';

// Selectors
import { selectIsTester, selectAuthTesterId } from 'selectors';

// Actions
import { fetchTester, fetchPublicTester } from 'actions';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'unset'
    }
}));

const TesterSingle = ({
    match: { params: { id = null } = {} } = {},
    fetchTester,
    fetchPublicTester,
    isTester,
    testerId
}) => {
    const c = useStyles();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (isTester)
            testerId &&
                fetchPublicTester(testerId).then(() => setLoading(false));
        else id && fetchTester(id).then(() => setLoading(false));
    });

    return (
        <Fragment>
            {isLoading ? (
                <BarLoader fullScreen />
            ) : (
                <Fragment>
                    <GridContainer className={c.root} alignItems='flex-start'>
                        <GridItem md={6}>
                            <TesterDetails testerId={id} />
                        </GridItem>
                        <GridItem md={6}>
                            <GridItem md={12}>
                                <ContactDetails />
                            </GridItem>
                            <GridItem md={12}>
                                <EmploymentDetails />
                            </GridItem>
                        </GridItem>
                    </GridContainer>
                    {!isTester && (
                        <Fragment>
                            <GridContainer
                                className={c.root}
                                alignItems='center'
                            >
                                <GridItem md={12}>
                                    <TestSessions />
                                </GridItem>
                            </GridContainer>
                            <GridContainer
                                className={c.root}
                                alignItems='center'
                            >
                                <GridItem md={12}>
                                    <ContactNotes />
                                </GridItem>
                            </GridContainer>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

const mapState = state => ({
    isTester: selectIsTester(state),
    testerId: selectAuthTesterId(state)
});

const mapDispatch = { fetchTester, fetchPublicTester };

const _TesterSingle = connect(
    mapState,
    mapDispatch
)(TesterSingle);

export { _TesterSingle as default, _TesterSingle as TesterSingle };
