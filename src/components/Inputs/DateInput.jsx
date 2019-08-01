import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { DatePicker } from 'material-ui-pickers';

import styles from './styles/dateInputStyle';
import DateUtilsWrapper from './DateUtilsWrapper';

function DateInput({ ...props }) {
    const {
        classes,
        labelText = 'Label',
        value = '',
        id = '',
        disablePast = false,
        placeholder = '',
        minDate = new Date(new Date().getFullYear() - 1 + '-01-01'), // limited to previous 1 year
        maxDate = new Date('2100-01-01'),
        isAmend = false,
        onChange = () => {},
    } = props;

    return (
        <DateUtilsWrapper>
            <DatePicker
                fullWidth
                id={id}
                label={labelText}
                className={classNames(classes.textField)}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                placeholder={placeholder}
                disablePast={disablePast ? true : false}
                format='dd/MM/yyyy'
                onChange={onChange}
                InputProps={{
                    disableUnderline: true,
                    inputProps: {
                        className: classes.inputTextFieldDate,
                    },
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton disabled>
                                <SvgIcon>
                                    <path
                                        fill='rgba(0, 0, 0, 0.38)'
                                        d='M19,4H18V2H16V4H8V2H6V4H5A2,2 0 0,0 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M5,8V6H19V8H5M7,12H17V14H7V12M7,16H14V18H7V16Z'
                                    />
                                </SvgIcon>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: classNames(
                            classes.inputLabelRoot,
                            classes.inputLabelDate,
                            isAmend && classes.bgAmendColor
                        ),
                        focused: classes.inputLabelFocused,
                        shrink: classes.inputLabelShrank,
                    },
                }}
            />
        </DateUtilsWrapper>
    );
}

DateInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
};

const _DateInput = withStyles(styles)(DateInput);

export { _DateInput as default, _DateInput as DateInput }