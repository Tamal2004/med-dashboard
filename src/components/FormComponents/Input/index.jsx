import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const Input = ({ required, label, isCard, active, width, ...restProps }) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const inputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };

    const controlProps = { required, label, isCard, width };
    return (
        <Control {...controlProps}>
            <InputBase styles={inputStyles} {...restProps} />
        </Control>
    );
};

Input.defaultProps = {
    required: false,
    isCard: false,
    active: true
};

Input.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { Input as default, Input };
