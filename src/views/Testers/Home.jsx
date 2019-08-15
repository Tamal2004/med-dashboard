import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	Link,
	NavigateButton,
	Table
} from 'components';

const useStyles = makeStyles(theme => ({
	gridDistance: {
		marginBottom: 32
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

const generateData = (reference, cost, Supplier, dev) => ({
	'Tester name': {
		Component: <Link to={'/tester/' + reference}>{reference}</Link>,
		value: reference
	},
	'Tester number': 1014,
	'Last project': {
		Component: <Link to={'/project/' + Supplier}>{Supplier}</Link>,
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
		<Fragment>
			<GridWrapper>
				<GridItem md={12} className={c.buttonGridStyle}>
					<Link to={'/tester/search'}>
						<NavigateButton variant='outlined' color='primary'>
							Search for a tester
						</NavigateButton>
					</Link>
					<Link to={'/tester/new'}>
						<NavigateButton color='secondary'>
							Add a new tester
						</NavigateButton>
					</Link>
				</GridItem>
			</GridWrapper>

			<GridWrapper>
				<GridItem md={12}>
					<Table action={true} data={trimData} page={1} />
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

export { TesterHome as default, TesterHome };
