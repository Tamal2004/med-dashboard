import React from 'react';
import PropTypes from 'prop-types';

// Material
import { withStyles, FormControlLabel } from '@material-ui/core';

// Local
import styles from './styles';
import { composeClasses } from 'helpers';
import { CheckboxBase } from 'components';

const Checkbox = ({ ...props }) => {
    const { classes, styles, label, disabled, ...restProps } = props;

    return (
        <FormControlLabel
            classes={composeClasses({ classes, styles })}
            label={label}
            disabled={disabled}
            control={<CheckboxBase {...restProps} />}
        />
    );
};

Checkbox.propTypes = {
    classes: PropTypes.object.isRequired
};

const _Checkbox = withStyles(styles)(Checkbox);

export { _Checkbox as default, _Checkbox as Checkbox };
