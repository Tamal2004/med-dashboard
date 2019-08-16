import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SearchFilter } from './SearchFilter';

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
	gridDistance: {
		marginBottom: 32
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

const TesterSearch = ({ countries }) => {
	const c = useStyles();
	return (
		<Fragment>
			<GridWrapper>
				<GridItem md={6}>
					<SearchInput placeholder='Search by name or project reference' />
					<div className={c.searchMessage}>
						Showing results for <b>'wpu'</b>. &nbsp;&nbsp;
						<i>Search instead for 'wup'</i>
					</div>
				</GridItem>
			</GridWrapper>

			<GridWrapper className={c.filterGridWrapper}>
				<GridItem md={3}>
					<SearchFilter />
				</GridItem>
				<GridItem md={9}>
					<div className={c.filterButtonWrapper}>
						<Link to={'/tester/mail'}>
							<NavigateButton color='secondary'>
								Email Testers
							</NavigateButton>
						</Link>
					</div>
					<Table data={countries} page={1} />
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _TesterSearch = connect(
	mapState,
	null
)(TesterSearch);

export { _TesterSearch as default, _TesterSearch as TesterSearch };
