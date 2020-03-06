import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const MultiInput = ({
    required,
    label,
    isCard,
    memo,
    active,
    width,
    ...restProps
}) => {
    const {
        cardRoot,
        inactiveRoot,
        inputMultiline,
        cardInputMultiline,
        ...c
    } = useStyles();
    const [error, setError] = useState(false);
    const multiInputStyles = {
        ...c,
        root: clsx(
            c.root,
            isCard && cardRoot,
            !active && inactiveRoot,
            !!memo && c.memoRoot
        ),
        inputMultiline: clsx(inputMultiline, isCard && cardInputMultiline)
    };
    const controlProps = { required, label, isCard, memo, width, error };

    return (
        <Control {...controlProps}>
            <InputBase
                handleError={error => setError(error)}
                styles={multiInputStyles}
                readOnly={!active}
                multiline
                rows={isCard ? '' : 8}
                normalize={value => (value.trim() === '' ? null : value)}
                {...restProps}
            />
        </Control>
    );
};

MultiInput.defaultProps = {
    required: false,
    isCard: false,
    active: true
};

MultiInput.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { MultiInput as default, MultiInput };
