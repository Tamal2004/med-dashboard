import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import API, { graphqlOperation } from '@aws-amplify/api';

import {
    GridContainer,
    GridItem,
    Link,
    NavigateButton,
    Table
} from 'components';

// Selectors
import { selectCounties } from 'selectors';
import { listBlogs } from 'graphql/queries';

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

const TesterHome = ({ testers }) => {
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
                    <Table data={testers} page={1} />
                </GridItem>
            </GridWrapper>
        </Fragment>
    );
};

const generateProjects = (
    tester,
    number,
    project,
    date = '07/04/2018',
    contactDate = '02/06/2019'
) => ({
    'Tester Name': {
        Component: <Link to={`/tester/${tester}`}>{tester}</Link>,
        value: tester
    },
    'Tester Number': number,
    'Last Project': {
        Component: <Link to={`/project/${project}`}>{project}</Link>,
        value: project
    },
    'Last Testing Date': date,
    'Last Contact Date': contactDate
});

const mapState = state => ({
    testers: Array.range(0, 3)
        .map(() => [
            generateProjects('John Test', 1014, 'GM33'),
            generateProjects('Jill Test', 5234, 'GM33', '03/09/2018'),
            generateProjects('Adolf Test', 4001, '03/09/2018', '08/12/2018')
        ])
        .flatMap(x => x)
});

const _TesterHome = connect(
    mapState,
    null
)(TesterHome);

export { _TesterHome as default, _TesterHome as TesterHome };
