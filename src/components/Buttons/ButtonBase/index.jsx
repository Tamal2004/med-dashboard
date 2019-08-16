import React from 'react';

import { withStyles, Button } from '@material-ui/core';

// Local
import { styles } from './styles';
import { composeClasses } from 'libs';
import { CircularLoader } from 'components';

const ButtonBase = ({ classes, styles, children, isLoading, ...restProps }) => {
    return (
        <Button
            variant='contained'
            classes={composeClasses({ classes, styles })}
            {...restProps}
        >
            {isLoading ? <CircularLoader /> : children}
        </Button>
    );
};

const _ButtonBase = withStyles(styles)(ButtonBase);

export { _ButtonBase as default, _ButtonBase as ButtonBase };
