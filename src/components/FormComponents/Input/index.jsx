import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const Input = ({ required = false, label, isCard, active, ...restProps }) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const inputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };
    return (
        <Control label={label} required={required} isCard={isCard}>
            <InputBase styles={inputStyles} {...restProps} />
        </Control>
    );
};

Input.defaultProps = {
    isCard: false,
    active: true
};

Input.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { Input as default, Input };
