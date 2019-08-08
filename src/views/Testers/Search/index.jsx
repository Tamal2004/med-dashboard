import React, { Fragment } from 'react';
import classNames from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SearchFilter } from './SearchFilter';

import {
	GridContainer,
	GridItem,
	NavigateButton,
	Table,
	SearchInput
} from 'components';

const useStyles = makeStyles(theme => ({
	anchorStyle: {
		textDecoration: 'none',
		color: theme.palette.primary.main
	},
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

const LinkTo = ({ to, children }) => {
	const c = useStyles();
	return (
		<Link className={c.anchorStyle} to={to}>
			{children}
		</Link>
	);
};

const generateData = (reference, cost, Supplier, dev) => ({
	Client: {
		Component: <LinkTo to={'/client/' + reference}>{reference}</LinkTo>,
		value: reference
	},
	'Latest project': {
		Component: <LinkTo to={'/project/' + cost}>{cost}</LinkTo>,
		value: cost
	},
	'Latest project date': Supplier,
	'Last contact date': dev
});

const trimData = [
	generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
	generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
	generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
	generateData('ETCBR-734', '24.00', 'Frieza', 'Great Look Retailers'),
	generateData('ETCBR-246', '6.00', 'Penny', 'Good Look Retailers')
];

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

const TesterSearch = () => {
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
						<LinkTo to={'/tester/mail'}>
							<NavigateButton color='secondary'>
								Email Testers
							</NavigateButton>
						</LinkTo>
					</div>
					<Table action={true} data={trimData} page={1} />
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

export { TesterSearch as default, TesterSearch };
