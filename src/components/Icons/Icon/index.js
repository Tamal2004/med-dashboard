import React, { cloneElement } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material
import { withStyles, withTheme } from '@material-ui/core/styles';
import MuiIcon from '@material-ui/core/Icon';

// Local
import styles from './styles';

const Icon = ({
    classes: { iconStyle },
    theme: {
        palette: { action }
    },
    disabled,
    children,
    ...restProps
}) => {
    const child = Array.isArray(children) ? children[0] : children;
    const {
        props: { className }
    } = child;
    const passedProps = {
        className: className ? classNames(className, iconStyle) : iconStyle,
        fill: disabled ? action.disabled : undefined
    };
    return (
        <MuiIcon {...restProps}>
            {' '}
            {cloneElement(child, { ...passedProps })}{' '}
        </MuiIcon>
    );
};

Icon.propTypes = {
    classes: PropTypes.object.isRequired,
    // Only 1 child is permitted
    children: PropTypes.oneOfType([PropTypes.object])
};

const _Icon = compose(
    withStyles(styles),
    withTheme
)(Icon);

export { _Icon as default, _Icon as Icon };
