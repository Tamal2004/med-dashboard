import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// custom icon
import { CheckBoxIconBlank, CheckBoxIconFilled } from 'components';

import styles from './styles/checkboxStyle';

function CheckboxInput({ ...props }) {
    const {
        classes,
        labelText = '',
        color = 'default',
        onChange = () => {},
        isDisabled = false,
        isChecked = false,
    } = props;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={
                        <CheckBoxIconBlank
                            width='24px'
                            height='24px'
                            color='black'
                        />
                    }
                    checkedIcon={
                        <CheckBoxIconFilled
                            width='24px'
                            height='24px'
                            color='black'
                        />
                    }
                    color={color}
                    onChange={onChange}
                />
            }
            disabled={isDisabled}
            checked={isChecked}
            label={labelText}
            classes={{
                disabled: classes.disabledCheckboxLabel,
            }}
        />
    );
}

CheckboxInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
};

const _CheckboxInput = withStyles(styles)(CheckboxInput);

export { _CheckboxInput as default, _CheckboxInput as CheckboxInput };
