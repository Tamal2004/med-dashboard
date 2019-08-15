import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	Link,
	NavigateButton,
	Table
} from 'components';
import { selectCounties } from 'selectors';

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

const GridWrapper = ({ children }) => {
	const c = useStyles();
	return (
		<GridContainer className={c.gridDistance} alignItems='center'>
			{children}
		</GridContainer>
	);
};

const TesterHome = ({ countries }) => {
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
					<Table action={true} data={countries} page={1} />
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _TesterHome = connect(
	mapState,
	null
)(TesterHome);

export { _TesterHome as default, _TesterHome as TesterHome };
