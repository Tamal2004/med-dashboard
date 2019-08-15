import React from 'react';

import { GridContainer, GridItem, Link, Table } from 'components';

const generateData = (reference, cost, Supplier, dev) => ({
	'Project reference': {
		Component: <Link to={'/project/' + reference}>{reference}</Link>,
		value: reference
	},
	'Project title': {
		Component: <Link to={'/project/' + reference}>{reference}</Link>,
		value: reference
	},
	'Observed date': '06/08/2019',
	'Project status': 'In progress',
	'Principal contact': 'Hannah Finney',
	'Last contact date': '06/08/2019'
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

const ClientSingle = () => {
	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				<Table action={true} data={trimData} page={1} />
			</GridItem>
		</GridContainer>
	);
};

export { ClientSingle as default, ClientSingle };
