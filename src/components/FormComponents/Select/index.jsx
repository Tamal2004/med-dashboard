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

    const [isError, setForm] = useState(false);

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

    const controlProps = { required, label, isCard, width, isError };

    return (
        <Control {...controlProps}>
            <SelectBase
                handleForm={isError => setForm(isError)}
                styles={selectStyles}
                {...restProps}
            />
        </Control>
    );
};

Select.defaultProps = {
    placeholder: 'Please select...',
    isCard: false,
    active: true
};

Select.propTypes = {
    data: PropTypes.array.isRequired,
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { Select as default, Select };
