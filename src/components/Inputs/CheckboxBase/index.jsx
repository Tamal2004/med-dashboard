import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

// Material
import { withStyles, Checkbox } from '@material-ui/core';

// Local
import styles from './styles';
import { CheckboxBlankIcon, CheckboxFilledIcon } from 'assets';

const CheckboxBase = ({
    classes: c,
    styles,
    color = 'default',
    input: { value, ...input },
    ...restProps
}) => {
    return (
        <Checkbox
            className={c.root}
            icon={<CheckboxBlankIcon className={c.icon} />}
            checkedIcon={<CheckboxFilledIcon className={c.icon} />}
            color={color}
            checked={!!value}
            {...input}
            {...restProps}
        />
    );
};

CheckboxBase.propTypes = {
    classes: PropTypes.object.isRequired
};

const _CheckboxBase = withStyles(styles)(CheckboxBase);

const __CheckboxBase = props => <Field component={_CheckboxBase} {...props} />;

export { __CheckboxBase as default, __CheckboxBase as CheckboxBase };
