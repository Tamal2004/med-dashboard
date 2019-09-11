import React from 'react';
import clsx from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

// Local
import ForwardIcon from './ForwardIcon';

const styles = ({ spacing }) => ({
	root: {
		transform: 'rotate(180deg)',
		marginLeft: spacing() / 4,
		fill: 'inherit'
	}
});

const BackwardIcon = ({ classes: c, className }) => (
	<ForwardIcon className={clsx(c.root, className)} />
);

const _BackwardIcon = withStyles(styles)(BackwardIcon);

export { _BackwardIcon as default, _BackwardIcon as BackwardIcon };
