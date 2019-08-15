import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
	GridContainer,
	GridItem,
	NavigateButton,
	Table,
	SearchInput
} from 'components';

import { selectCounties } from 'selectors';

const useStyles = makeStyles(theme => ({
	buttonGridStyle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignContent: 'flex-end'
	}
}));

const ClientHome = ({ countries }) => {
	const c = useStyles();
	return (
		<GridContainer alignItems='center'>
			<GridItem md={6}>
				<SearchInput placeholder='Search by name or project reference' />
			</GridItem>
			<GridItem md={6} className={c.buttonGridStyle}>
				<NavigateButton variant='outlined'>
					Add a new client
				</NavigateButton>
			</GridItem>
			<GridItem md={12}>
				<Table action={true} data={countries} page={1} />
			</GridItem>
		</GridContainer>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _ClientHome = connect(
	mapState,
	null
)(ClientHome);

export { _ClientHome as default, _ClientHome as ClientHome };
