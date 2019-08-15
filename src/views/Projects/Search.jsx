import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer, GridItem, Table, SearchInput } from 'components';

import { selectCounties } from 'selectors';

const useStyles = makeStyles(theme => ({
	searchMessage: {
		paddingTop: 5,
		textAlign: 'center'
	}
}));

const ProjectSearch = ({ countries }) => {
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
				<Table action={true} data={countries} page={1} />
			</GridItem>
		</GridContainer>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _ProjectSearch = connect(
	mapState,
	null
)(ProjectSearch);

export { _ProjectSearch as default, _ProjectSearch as ProjectSearch };
