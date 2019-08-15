import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	Link,
	NavigateButton,
	Table,
	SearchInput
} from 'components';

import { selectCounties } from 'selectors';

const useStyles = makeStyles(theme => ({
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	}
}));

const MondayProjects = ({ data, weekday }) => {
	return (
		<Fragment>
			<div>Table for Monday projects</div>
			<Table data={data} page={1} />
		</Fragment>
	);
};

const ProjectHome = ({ location, countries }) => {
	const c = useStyles();
	const params = new URLSearchParams(location.search);
	const queryParam = params.get('weekday');

	return (
		<GridContainer alignItems='center'>
			<GridItem md={6}>
				<SearchInput placeholder='Search by name or project reference' />
			</GridItem>
			<GridItem md={6} className={c.buttonGridStyle}>
				<Link to={{ pathname: '/project', search: '?weekday=monday' }}>
					<NavigateButton variant='outlined'>
						List projects for Monday morning
					</NavigateButton>
				</Link>
			</GridItem>
			<GridItem md={12}>
				{queryParam ? (
					<MondayProjects data={countries} weekday={queryParam} />
				) : (
					<Table data={countries} page={1} />
				)}
			</GridItem>
		</GridContainer>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _ProjectHome = connect(
	mapState,
	null
)(ProjectHome);

export { _ProjectHome as default, _ProjectHome as ProjectHome };
