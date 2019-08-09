import React from 'react';

import { withStyles } from '@material-ui/core';

// Local
import { styles } from './styles';
import { ButtonBase } from '../ButtonBase';
import { composeClasses } from 'libs';

const Button = ({ classes, styles, ...restProps }) => (
	<ButtonBase classes={composeClasses({ classes, styles })} {...restProps} />
);

const _Button = withStyles(styles)(Button);

export { _Button as default, _Button as Button };
