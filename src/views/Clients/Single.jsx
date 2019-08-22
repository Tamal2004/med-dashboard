import React from 'react';
import { connect } from 'react-redux';

import { GridContainer, GridItem, Table, Link } from 'components';
import { selectCounties } from 'selectors';

const ClientSingle = ({ clients }) => {
	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				<Table action={true} data={clients} page={1} />
			</GridItem>
		</GridContainer>
	);
};
const generateProjects = (
	project,
	title,
	status,
	contact = 'Hannah Finney',
	date = '07/04/2018',
	contactDate = '02/06/2019'
) => ({
	'Project Reference': {
		Component: <Link to={`/project/${project}`}>{project}</Link>,
		value: project
	},
	'Project Title': {
		Component: <Link to={`/project/${project}`}>{title}</Link>,
		value: title
	},
	'Observed Date': date,
	'Project Status': date,
	'Principal Contact': 'Nabil Ahmad',
	'Last Contact Date': contactDate
});

const mapState = state => ({
	clients: Array.range(0, 3)
		.map(() => [
			generateProjects('EM21', 'Website testing', 'In Progress'),
			generateProjects('GM33', 'Header, PLP, PDP', 'Proposal Sent'),
			generateProjects(
				'JE24',
				'App testing round 2',
				'Completed',
				'08/12/2018'
			)
		])
		.flatMap(x => x)
});
const _ClientSingle = connect(
	mapState,
	null
)(ClientSingle);

export { _ClientSingle as default, _ClientSingle as ClientSingle };
