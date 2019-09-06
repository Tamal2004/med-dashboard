import React from 'react';
import clsx from 'clsx';

import { withStyles, Button } from '@material-ui/core';

// Local
import { styles } from './styles';
import { composeClasses } from 'libs';

const ButtonBase = ({ classes, styles, children, loading, ...restProps }) => {
    const { root, rootLoading, ...c } = composeClasses({ classes, styles });

    return (
        <Button
            variant='contained'
            classes={{
                root: clsx(root, loading && rootLoading),
                ...c
            }}
            {...restProps}
        >
            {children}
        </Button>
    );
};

const _ButtonBase = withStyles(styles)(ButtonBase);

export { _ButtonBase as default, _ButtonBase as ButtonBase };
