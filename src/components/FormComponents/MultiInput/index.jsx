import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const MultiInput = ({
    required = false,
    label,
    isCard,
    active,
    ...restProps
}) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const multiInputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };
    return (
        <Control label={label} required={required} isCard={isCard}>
            <InputBase
                styles={multiInputStyles}
                multiline
                rows={8}
                rowsMax={8}
                {...restProps}
            />
        </Control>
    );
};

MultiInput.defaultProps = {
    isCard: false,
    active: true
};

MultiInput.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { MultiInput as default, MultiInput };
