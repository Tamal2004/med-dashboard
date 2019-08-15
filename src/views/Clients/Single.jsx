import React from 'react';
import { connect } from 'react-redux';

import { GridContainer, GridItem, Table } from 'components';
import { selectCounties } from 'selectors';

const ClientSingle = ({ countries }) => {
	return (
		<GridContainer alignItems='center'>
			<GridItem md={12}>
				<Table action={true} data={countries} page={1} />
			</GridItem>
		</GridContainer>
	);
};

const mapState = state => ({
	countries: selectCounties(state)
});

const _ClientSingle = connect(
	mapState,
	null
)(ClientSingle);

export { _ClientSingle as default, _ClientSingle as ClientSingle };
