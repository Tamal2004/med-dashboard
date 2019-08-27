import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Control } from '../Control';
import { MultiSelectBase } from 'components';

const MultiSelect = ({
    required = false,
    label,
    isCard,
    active,
    ...restProps
}) => {
    const c = useStyles();

    const selectStyles = {
        control: !active && c.inactiveControl,
        icon: !active && c.inactiveIcon
    };

    const controlProps = { required, label, isCard };

    return (
        <Control {...controlProps}>
            <MultiSelectBase styles={selectStyles} {...restProps} />
        </Control>
    );
};

MultiSelect.defaultProps = {
    isCard: false,
    active: true
};

MultiSelect.propTypes = {
    data: PropTypes.array.isRequired,
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { MultiSelect as default, MultiSelect };
