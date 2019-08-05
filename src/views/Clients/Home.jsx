import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	NavigateButton,
	Table,
	SearchInput
} from 'components';

import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	}
}));

const generateData = (reference, cost, Supplier, dev) => ({
	Reference: reference,
	'Trim Cost': {
		Component: (
			<Typography
				style={{ color: 'blue' }}
				onClick={() => console.log('pushing')}
			>
				{cost}
			</Typography>
		),
		value: cost
	},
	Supplier,
	'Trim Development For': {
		Component: (
			<Button color='primary' variant='contained'>
				{dev}
			</Button>
		),
		value: dev
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

const ClientHome = () => {
	const c = useStyles();
	return (
		<GridContainer alignItems='center'>
			<GridItem md={6}>
				<SearchInput placeholder='Search by name or project reference' />
			</GridItem>
			<GridItem md={6} className={c.buttonGridStyle}>
				<NavigateButton>Add a new client</NavigateButton>
			</GridItem>
			<GridItem md={12}>
				<Table data={trimData} page={1} />
			</GridItem>
		</GridContainer>
	);
};

export { ClientHome as default, ClientHome };
