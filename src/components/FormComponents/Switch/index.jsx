import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { SwitchBase } from 'components';
import { Control } from '../Control';

const Switch = ({
    required = false,
    label,
    isCard,
    active,
    ...restProps
}) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const switchStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };

    const controlProps = { required, label, isCard };
    return (
        <Control {...controlProps}>
            <SwitchBase color='primary' styles={switchStyles} {...restProps} />
        </Control>
    );
};

Switch.defaultProps = {
    isCard: false,
    active: true
};

Switch.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { Switch as default, Switch };
