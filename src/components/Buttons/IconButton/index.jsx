import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import styles from './styles';

function _IconButton({ ...props }) {
    const { classes, children, color, onClick } = props;

    return (
        <IconButton
            color={color}
            onClick={onClick}
            className={classes.menuButton}
        >
            {children}
        </IconButton>
    );
}

_IconButton.defaultProps = {
    color: 'inherit',
    onClick: () => {}
};

_IconButton.propTypes = {
    classes: PropTypes.object,
    color: PropTypes.string,
    onClick: PropTypes.func
};

const __IconButton = withStyles(styles)(_IconButton);

export { __IconButton as default, __IconButton as IconButton };

// classes.menuButton,
//                 !isOpen && classes.menuButtonClosed
