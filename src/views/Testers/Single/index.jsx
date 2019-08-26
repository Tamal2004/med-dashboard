import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// Material
import { makeStyles, Typography } from '@material-ui/core';

// Local
import { validateRequired } from 'libs';
import TesterDetails from './TesterDetails';
import ContactDetails from './ContactDetails';
import EmploymentDetails from './EmploymentDetails';
import TestSessions from './TestSessions';
import ContactNotes from './ContactNotes';

// Components
import { GridContainer, GridItem } from 'components';

// Selectors
import { selectIsTester, selectTesterId } from 'selectors';

// Actions
import { fetchTester } from 'actions';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'unset'
    }
}));

const TesterSingle = ({
    match: { params: { id = null } = {} } = {},
                          fetchTester,
    isTester,
    testerId
}) => {
    const c = useStyles();

    useEffect(() => {
        console.log('arstast')
        fetchTester(id)
    })

    console.log(id);
    return (
        <Fragment>
            <GridContainer className={c.root} alignItems='flex-start'>
                <GridItem md={6}>
                    <TesterDetails />
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
                    <GridContainer className={c.root} alignItems='center'>
                        <GridItem md={12}>
                            <TestSessions />
                        </GridItem>
                    </GridContainer>
                    <GridContainer className={c.root} alignItems='center'>
                        <GridItem md={12}>
                            <ContactNotes />
                        </GridItem>
                    </GridContainer>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapState = state => ({
    // isTester: selectIsTester(state),
    isTester: false,
    testerId: selectTesterId(state)
});

const mapDispatch = { fetchTester };

const _TesterSingle = connect(mapState, mapDispatch)(TesterSingle);

export { _TesterSingle as default, _TesterSingle as TesterSingle };
