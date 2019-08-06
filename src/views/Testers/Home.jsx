import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { GridContainer, GridItem, NavigateButton, Table } from 'components';

const useStyles = makeStyles(theme => ({
	gridDistance: {
		marginBottom: 32
	},
	anchorStyle: {
		textDecoration: 'none',
		color: theme.palette.primary.main
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

const LinkTo = ({ to, children }) => {
	const c = useStyles();
	return (
		<Link className={c.anchorStyle} to={to}>
			{children}
		</Link>
	);
};

const generateData = (reference, cost, Supplier, dev) => ({
	'Tester name': {
		Component: <LinkTo to={'/tester/' + reference}>{reference}</LinkTo>,
		value: reference
	},
	'Tester number': 1014,
	'Last project': {
		Component: <LinkTo to={'/project/' + Supplier}>{Supplier}</LinkTo>,
		value: reference
	},
	'Last testing date': '02/06/2019',
	'Last contact date': '02/06/2019'
});

const trimData = [
	generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
	generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
	generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
	generateData('ETCBR-734', '24.00', 'Frieza', 'Great Look Retailers'),
	generateData('ETCBR-246', '6.00', 'Penny', 'Good Look Retailers'),
	generateData('ETCBR-836', '244.00', 'Sheldor', 'Luxury Look Retailers'),
	generateData('ETCBR-214', '25.00', 'Azeroth', 'Rich Look Retailers'),
	generateData('ETCBR-787', '2.00', 'Gater', 'Poor Look Retailers'),
	generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers')
];

const GridWrapper = ({ children }) => {
	const c = useStyles();
	return (
		<GridContainer className={c.gridDistance} alignItems='center'>
			{children}
		</GridContainer>
	);
};

const TesterHome = () => {
	const c = useStyles();
	return (
		<div>
			<GridWrapper>
				<GridItem md={12} className={c.buttonGridStyle}>
					<LinkTo to={'/tester/search'}>
						<NavigateButton variant='outlined' color='primary'>
							Search for a tester
						</NavigateButton>
					</LinkTo>
					<LinkTo to={'/tester/new'}>
						<NavigateButton color='secondary'>
							Add a new tester
						</NavigateButton>
					</LinkTo>
				</GridItem>
			</GridWrapper>

			<GridWrapper>
				<GridItem md={12}>
					<Table action={true} data={trimData} page={1} />
				</GridItem>
			</GridWrapper>
		</div>
	);
};

export { TesterHome as default, TesterHome };
