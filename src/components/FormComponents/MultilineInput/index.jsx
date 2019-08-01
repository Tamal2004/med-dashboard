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


const MultilineInput = ({
    classes: { root, amendRoot, disabled, amendDisabled, ...restClasses },
    placeholder,
    amended,
    ...restProps
}) => {
    const props = {
        placeholder: placeholder || restProps.label || '',
        multiline: true,
        rows: 8,
        rowsMax: 8,
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

const _MultilineInput = compose(
    connect(mapState),
    withStyles(styles)
)(MultilineInput);


export { _MultilineInput as default, _MultilineInput as MultilineInput };
