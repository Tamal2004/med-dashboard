import React from 'react';

import { withStyles } from '@material-ui/core';

// Local
import { styles } from './styles';
import { ButtonBase } from 'components';
import { composeClasses } from 'libs';

const Button = ({ classes, styles, ...restProps }) => (
    <ButtonBase
        styles={composeClasses({ classes, styles })}
        color='primary'
        {...restProps}
    />
);

const _Button = withStyles(styles)(Button);

export { _Button as default, _Button as Button };
