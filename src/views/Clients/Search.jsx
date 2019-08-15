import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	Link,
	NavigateButton,
	Table,
	SearchInput
} from 'components';

const useStyles = makeStyles(theme => ({
	searchMessage: {
		paddingTop: 5,
		textAlign: 'center'
	}
}));

const generateData = (reference, cost, Supplier, dev) => ({
	Client: {
		Component: <Link to={'/client/' + reference}>{reference}</Link>,
		value: reference
	},
	'Latest project': {
		Component: <Link to={'/project/' + cost}>{cost}</Link>,
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

const ClientSearch = () => {
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
				<Table action={true} data={trimData} page={1} />
			</GridItem>
		</GridContainer>
	);
};

export { ClientSearch as default, ClientSearch };
