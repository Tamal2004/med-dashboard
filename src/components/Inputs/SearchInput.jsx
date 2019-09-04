import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import styles from './styles/textInputStyle';

function SearchInput({ ...props }) {
    const {
        classes,
        labelText,
        placeholder,
        inputType,
        isDisabled,
        handleChange = () => {},
        isAmend,
        required,
        multiline,
        textArea,
        rows,
        Adornment,
        handleClick = () => {},
        color
    } = props;
    const [value, setValue] = useState('');
    const handleText = ({ target: { value = '' } } = {}) => setValue(value);

    const keyPressed = e => {
        if (e.which === 13) {
            console.log('arstarstrastrastrat')
            handleClick(value);
        }
    };

    return (
        <TextField
            fullWidth
            required={required}
            multiline={multiline}
            rows={multiline ? rows : null}
            label={labelText ? labelText : null}
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
                    className: textArea ? classes.textArea : ''
                },
                endAdornment: (
                    <InputAdornment
                        position='end'
                        onClick={() => handleClick(value)}
                    >
                        <IconButton color={color} edge='end'>
                            <Adornment color={color} />
                        </IconButton>
                    </InputAdornment>
                )
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
                            : classNames(classes.inputLabelShrank)
                }
            }}
            placeholder={placeholder}
            value={value}
            onChange={handleText}
            onKeyPress={keyPressed}
            onBlur={() => handleChange(value)}
            disabled={isDisabled}
        />
    );
}

SearchInput.defaultProps = {
    placeholder: '',
    inputType: 'type',
    labelText: null,
    value: '',
    isDisabled: false,
    handleText: () => {},
    isAmend: false,
    required: false,
    multiline: false,
    textArea: false,
    Adornment: SearchIcon,
    color: 'primary'
};

SearchInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    inputProps: PropTypes.object
};

const _SearchInput = withStyles(styles)(SearchInput);

export { _SearchInput as default, _SearchInput as SearchInput };
