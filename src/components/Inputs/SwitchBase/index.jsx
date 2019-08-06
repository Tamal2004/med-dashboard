import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

// Material
import { withStyles, Switch } from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'libs';

const SwitchBase = ({
    classes,
    styles,
    color = 'default',
    input: { value, ...input },
    ...restProps
}) => {
    return (
        <Switch
            classes={composeClasses({ classes, styles })}
            color={color}
            checked={!!value}
            {...input}
            {...restProps}
        />
    );
};

SwitchBase.propTypes = {
    classes: PropTypes.object.isRequired
};

const _SwitchBase = withStyles(styles)(SwitchBase);

const __SwitchBase = props => <Field component={_SwitchBase} {...props} />;

export { __SwitchBase as default, __SwitchBase as SwitchBase };
