import React from 'react';

import { withStyles } from '@material-ui/core';

// Local
import { styles } from './styles';
import { ButtonBase } from '../ButtonBase';
import { composeClasses } from 'libs';

const Button = ({ classes, styles, size, ...restProps }) => (
    <ButtonBase
        styles={composeClasses({ classes, styles })}
        style={{ height: size === 'large' ? 42 : 24}}
        color='primary'
        {...restProps}
    />
);

const _Button = withStyles(styles)(Button);

export { _Button as default, _Button as Button };
