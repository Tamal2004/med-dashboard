import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './styles';
import { InputBase } from 'components';

// Selectors
import { selectAmendedField } from 'selectors';

const Input = ({
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
    return <InputBase {...props} />;
};

const mapState = (state, { name }) => ({
    amended: selectAmendedField(state, name)
});

const _Input = compose(
    connect(mapState),
    withStyles(styles)
)(Input);

export { _Input as default, _Input as Input };
