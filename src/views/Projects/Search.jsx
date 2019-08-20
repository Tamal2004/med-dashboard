import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer, GridItem, Table, SearchInput , Link} from 'components';

import { selectCounties } from 'selectors';

const useStyles = makeStyles(theme => ({
	searchMessage: {
		paddingTop: 5,
		textAlign: 'center'
	}
}));

const ProjectSearch = ({ projects }) => {
	const c = useStyles();
	return (
		<GridContainer alignItems='center'>
			<GridItem md={6}>
				<SearchInput placeholder='Search by name or project reference' />
				<div className={c.searchMessage}>
					Showing results for <b>'wpu'</b>. &nbsp;&nbsp;
					<i>Search instead for 'wup'</i>
				</div>
			</GridItem>
			<GridItem md={12}>
				<Table action={true} data={projects} page={1} />
			</GridItem>
		</GridContainer>
	);
};
const generateProjects = (client, project, date = '07/04/2018', contactDate = '02/06/2019') => ({
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
			generateProjects('Wessex Water', 'GM33','03/09/2018'),
			generateProjects('Disney', 'JE24','03/09/2018', '08/12/2018'),
		])
		.flatMap(x => x)
});

const _ProjectSearch = connect(
	mapState,
	null
)(ProjectSearch);

export { _ProjectSearch as default, _ProjectSearch as ProjectSearch };
