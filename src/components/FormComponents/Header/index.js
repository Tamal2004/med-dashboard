import React from 'react';
import classNames from 'classnames';

// Material
import { withStyles, Toolbar, Typography } from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';

const Header = ({ classes, styles, title, children, ...restProps }) => {
    const c = composeClasses({ classes, styles });
    return (
        <Toolbar className={c.toolbar} {...restProps}>
            <Typography variant='h6' className={c.title}>
                {title}
            </Typography>
            {children}
        </Toolbar>
    );
};

const _Header = withStyles(styles)(Header);

export { _Header as default, _Header as Header };
