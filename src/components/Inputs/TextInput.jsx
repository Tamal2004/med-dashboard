import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import styles from './styles/textInputStyle';

function TextInput({ ...props }) {
    const {
        classes,
        labelText = 'Label',
        placeholderText = '',
        inputType = 'type',
        value = '',
        isDisabled = false,
        handleText = () => {},
        isAmend = false,
        required = false,
        multiline = false,
        textArea = false,
        rows,
    } = props;

    return (
        <TextField
            fullWidth
            required={required}
            multiline={multiline}
            rows={multiline ? rows : null}
            label={labelText ? labelText : ''}
            type={inputType}
            className={classes.textField}
            InputProps={{
                disableUnderline: true,
                className: classNames(
                    isDisabled ? classes.disabledTextField : null,
                    textArea
                        ? classes.inputTextAreaField
                        : classes.inputTextField,
                    isAmend ? classes.bgAmendColor : null
                ),
                inputProps: {
                    className: textArea ? classes.textArea : '',
                },
                endAdornment: isDisabled ? (
                    <InputAdornment position='end'>
                        <IconButton disabled>
                            <SvgIcon>
                                <path
                                    fill='rgba(0, 0, 0, 0.38)'
                                    d='M12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8H17V6A5,5 0 0,0 12,1M12,2.9C13.71,2.9 15.1,4.29 15.1,6V8H8.9V6C8.9,4.29 10.29,2.9 12,2.9M11,11H13V15H11V11M11,17H13V19H11V17Z'
                                />
                            </SvgIcon>
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.inputLabelRoot,
                    focused: classes.inputLabelFocused,
                    shrink:
                        value && value.length > 0
                            ? classNames(
                                  classes.inputLabelShrank,
                                  classes.inputHasSuccess
                              )
                            : classNames(classes.inputLabelShrank),
                },
            }}
            placeholder={placeholderText}
            value={value}
            onChange={handleText}
            disabled={isDisabled ? true : false}
        />
    );
}

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    inputProps: PropTypes.object,
};

const _TextInput = withStyles(styles)(TextInput);

export { _TextInput as default, _TextInput as TextInput }