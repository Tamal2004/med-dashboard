import React from 'react';

// Material
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		margin: spacing(),
		marginLeft: spacing(2),
		marginRight: spacing(2)
	}
}));
const CardDivider = () => {
	const c = useStyles();
	return <Divider className={c.root} />;
};
export { CardDivider as default, CardDivider };
