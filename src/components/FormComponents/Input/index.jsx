import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const Input = ({ required, label, isCard, active, width, ...restProps }) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();

    const [error, setError] = useState(false);
    const inputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };

    const controlProps = { required, label, isCard, width, error, active};
    return (
        <Control {...controlProps}>
            <InputBase
                handleError={error => setError(error)}
                styles={inputStyles}
                normalize={value => (value.trim() === '' ? null : value)}
                {...restProps}
            />
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
