import React from 'react';

import { withStyles } from '@material-ui/core';

// Local
import { styles } from './styles';
import { ButtonBase } from 'components';

const NavigateButton = ({ classes: c, ...restProps }) => {
    return (
        <ButtonBase
            classes={c}
            color='primary'
            {...restProps}
        />
    );
};

const _NavigateButton = withStyles(styles)(NavigateButton);

export { _NavigateButton as default, _NavigateButton as NavigateButton };
