import React, { Fragment } from 'react';
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
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	}
}));

const generateData = (reference, cost, Supplier, dev) => ({
	'Project reference': {
		Component: <Link to={'/project/' + reference}>{reference}</Link>,
		value: reference
	},
	Client: {
		Component: <Link to={'/client/' + cost}>{cost}</Link>,
		value: cost
	},
	'Project name': Supplier,
	'Testing date': dev
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
	generateData('ETCBR-214', '6.00', 'Derek', 'Funny Look Retailers')
];

const mondayData = [
	generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers')
];

const MondayProjects = ({ weekday }) => {
	return (
		<Fragment>
			<div>Table for Monday projects</div>
			<Table data={mondayData} page={1} />
		</Fragment>
	);
};

const ProjectHome = ({ location }) => {
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
					<MondayProjects weekday={queryParam} />
				) : (
					<Table data={trimData} page={1} />
				)}
			</GridItem>
		</GridContainer>
	);
};

export { ProjectHome as default, ProjectHome };
