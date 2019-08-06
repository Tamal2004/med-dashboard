import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GridContainer, GridItem, SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
	searchMessage: {
		paddingTop: 5,
		textAlign: 'center'
	}
}));

const ClientNew = () => {
	const c = useStyles();
	return (
		<GridContainer alignItems='center'>
			<GridItem md={6}>
				ADD NEW CLIENT -> NAME, CONTACT_NAME, CONTACT_NOTES
			</GridItem>
		</GridContainer>
	);
};

export { ClientNew as default, ClientNew };
