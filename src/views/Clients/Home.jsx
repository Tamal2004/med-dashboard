import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	NavigateButton,
	Table,
	SearchInput,
	Link,
	withModal
} from 'components';

import { selectCounties } from 'selectors';
import { AddNewClient } from 'views/Modals';

const useStyles = makeStyles(theme => ({
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	}
}));

const ClientHome = ({ projects, handleAddNewClient }) => {
	const c = useStyles();
	return (
		<GridContainer alignItems='center'>
			<GridItem md={3}></GridItem>
			<GridItem md={6}>
				<SearchInput placeholder='Search by name or project reference' />
			</GridItem>
			<GridItem md={3} className={c.buttonGridStyle}>
				<NavigateButton
					onClick={() => handleAddNewClient()}
					variant='outlined'
					color='secondary'
				>
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

const mapModal = {
	handleAddNewClient: AddNewClient
};

const _ClientHome = compose(
	connect(
		mapState,
		null
	),
	withModal(mapModal)
)(ClientHome);

export { _ClientHome as default, _ClientHome as ClientHome };
