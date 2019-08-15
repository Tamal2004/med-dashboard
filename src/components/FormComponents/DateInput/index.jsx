import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { DateInputBase } from 'components';
import { Control } from '../Control';

const DateInput = ({ required = false, label, isCard, active, ...restProps }) => {
    const { cardRoot, inactiveRoot, ...c } = useStyles();
    const dateInputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot)
    };

    const controlProps = { required, label, isCard };
    return (
        <Control {...controlProps}>
            <DateInputBase styles={dateInputStyles} {...restProps} />
        </Control>
    );
};

DateInput.defaultProps = {
    isCard: false,
    active: true
};

DateInput.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

export { DateInput as default, DateInput };
