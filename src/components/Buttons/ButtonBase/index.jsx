import React from 'react';

import { withStyles, Button } from '@material-ui/core';

// Local
import { styles } from './styles';
import { CircularLoader } from 'components';

const ButtonBase = ({ classes, children, isLoading, ...restProps }) => {
	return (
		<Button variant='contained' classes={classes} {...restProps}>
			{isLoading ? <CircularLoader /> : children}
		</Button>
	);
};

const _ButtonBase = withStyles(styles)(ButtonBase);

export { _ButtonBase as default, _ButtonBase as ButtonBase };
