import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Control } from '../Control';
import { SelectBase } from 'components';

const Select = ({
    required = false,
    label,
    isCard,
    active,
    width,
    placeholder,
    ...restProps
}) => {
    const {
        cardControl,
        cardListItem,
        cardSelect,
        inactiveControl,
        inactiveDropdownRoot,
        ...c
    } = useStyles();

    const [error, setError] = useState(false);

    const selectStyles = {
        ...c,
        control: clsx(
            c.control,
            isCard && cardControl,
            !active && inactiveControl
        ),
        listItem: clsx(c.listItem, isCard && cardListItem),
        select: clsx(c.select, isCard && cardSelect),
        dropdownRoot: clsx(c.dropdownRoot, !active && inactiveDropdownRoot)
    };

    const controlProps = { required, label, isCard, width, error };

    return (
        <Control {...controlProps}>
            <SelectBase
                handleError={error => setError(error)}
                styles={selectStyles}
                placeholder={active ? placeholder : ''}
                {...restProps}
            />
        </Control>
    );
};

Select.defaultProps = {
    placeholder: '',
    isCard: false,
    active: true
};

Select.propTypes = {
    data: PropTypes.array.isRequired,
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { Select as default, Select };
