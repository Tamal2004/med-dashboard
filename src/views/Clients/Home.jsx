import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    SearchInput,
    Link
} from 'components';

// Selectors
import { selectCounties } from 'selectors';

// Actions
import { fetchClients } from 'actions';

const useStyles = makeStyles(theme => ({
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const ClientHome = ({ projects, fetchClients }) => {
    const c = useStyles();
    useEffect(() => {
        fetchClients();
    });
    return (
        <GridContainer alignItems='center'>
            <GridItem md={6}>
                <SearchInput placeholder='Search by name or project reference' />
            </GridItem>
            <GridItem md={6} className={c.buttonGridStyle}>
                <NavigateButton variant='outlined'>
                    Add a new client
                </NavigateButton>
            </GridItem>
            <GridItem md={12}>
                <Table action={true} data={projects} page={1} />
            </GridItem>
        </GridContainer>
    );
};
const generateProjects = (
    client,
    project,
    date = '07/04/2018',
    contactDate = '02/06/2019'
) => ({
    Client: {
        Component: <Link to={`/client/${client}`}>{client}</Link>,
        value: client
    },
    'Latest Project': {
        Component: <Link to={`/project/${project}`}>{project}</Link>,
        value: project
    },
    'Latest Project Date': date,
    'Last Contact Date': contactDate
});

const mapState = state => ({
    projects: Array.range(0, 3)
        .map(() => [
            generateProjects('Aldi', 'EM21'),
            generateProjects('Wessex Water', 'GM33', '03/09/2018'),
            generateProjects('Disney', 'JE24', '03/09/2018', '08/12/2018')
        ])
        .flatMap(x => x)
});

const mapDispacth = { fetchClients };

const _ClientHome = connect(
    mapState,
    mapDispacth
)(ClientHome);

export { _ClientHome as default, _ClientHome as ClientHome };
