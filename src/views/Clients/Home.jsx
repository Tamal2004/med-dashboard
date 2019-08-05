import React from 'react';

import { GridContainer, GridItem } from 'components';

const ClientHome = () => {
	return (
		<GridContainer>
			<GridItem md={6}>A</GridItem>
			<GridItem md={6}>B</GridItem>
		</GridContainer>
	);
};

export { ClientHome as default, ClientHome };
