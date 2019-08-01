import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './styles';
import { SelectBase } from 'components';

// Selectors
import { selectAmendedField } from 'selectors';


const Select = ({
    classes: {
        control,
        placeholder: placeholderClass,
        amendControl,
        amendDisabled,
        amendPlaceholder,
        ...restClasses
    },
    placeholder = 'Select...',
    amended,
    ...restProps
}) => {
    const props = {
        placeholder,
        isCancellable: true,
        styles: {
            ...restClasses,
            control: classNames(control, amended && amendControl),
            disabled: amended && amendDisabled,
            placeholder: classNames(
                placeholderClass,
                amended && amendPlaceholder
            )
        },
        ...restProps
    };
    return <SelectBase {...props} />;
};

const mapState = (state, { name }) => ({
    amended: selectAmendedField(state, name)
});

const _Select = compose(
    connect(mapState),
    withStyles(styles)
)(Select);

export { _Select as default, _Select as Select };
