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
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
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
	'Last contact date': dev,
	'': {
		value: cost,
		checkAction: () => console.log('Check Meh'),
		editAction: () => console.log('Edit Meh'),
		deleteAction: () => console.log('Delete Meh')
	}
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
	generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers'),
	generateData('ETCBR-214', '6.00', 'Derek', 'Funny Look Retailers'),
	generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers'),
	generateData('ETCBR-214', '6.00', 'Derek', 'Funny Look Retailers')
];

const GridWrapper = ({ children }) => {
	const c = useStyles();
	return (
		<GridContainer className={c.gridDistance} alignItems='center'>
			{children}
		</GridContainer>
	);
};

const TesterSingle = ({ match }) => {
	const c = useStyles();
	return (
		<div>
			<GridWrapper>
				<GridItem md={12} className={c.buttonGridStyle}>
					<NavigateButton color='secondary'>
						Add a new client
					</NavigateButton>
				</GridItem>
			</GridWrapper>

			<GridWrapper>
				<GridItem md={6}>
					<h3>Client id: {match.params.id}</h3>
				</GridItem>
				<GridItem md={6}>
					<GridItem md={12}>Upper</GridItem>
					<GridItem md={12}>Lower</GridItem>
				</GridItem>
			</GridWrapper>

			<GridWrapper>
				<GridItem md={12}>Test sessions</GridItem>
			</GridWrapper>

			<GridWrapper>
				<GridItem md={12}>Contact notes</GridItem>
			</GridWrapper>
		</div>
	);
};

export { TesterSingle as default, TesterSingle };
