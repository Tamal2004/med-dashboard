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
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const [isError, setForm] = useState(false);
    const multiInputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };
    const controlProps = { required, label, isCard, memo, width, isError };

    return (
        <Control {...controlProps}>
            <InputBase
                handleForm={isError => setForm(isError)}
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
    required: false,
    isCard: false,
    active: true
};

MultiInput.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { MultiInput as default, MultiInput };
