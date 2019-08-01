import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './styles';
import { DateInputBase } from 'components';

// Selectors
import { selectAmendedField } from 'selectors';

const DateInput = ({
    classes: { root, amendRoot, disabled, amendDisabled, ...restClasses },
    placeholder,
    amended,
    ...restProps
}) => {
    const props = {
        placeholder: placeholder || restProps.label || '',
        styles: {
            ...restClasses,
            root: classNames(root, amended && amendRoot),
            disabled: classNames(disabled, amended && amendDisabled)
        },
        ...restProps
    };
    return <DateInputBase {...props} />;
};

const mapState = (state, { name }) => ({
    amended: selectAmendedField(state, name)
});

const _DateInput = compose(
    connect(mapState),
    withStyles(styles)
)(DateInput);

export { _DateInput as default, _DateInput as DateInput };
