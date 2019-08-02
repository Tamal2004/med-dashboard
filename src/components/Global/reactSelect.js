/* eslint-disable react/prop-types, react/jsx-handler-names */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { amendColor } from './variables';

import GreenTick from './assets/img/green-tick.svg';

const styles = theme => ({
    inputTextField: {
        display: 'flex',
        fontSize: '.875rem',
        padding: '0 3px 0 20px',
        border: '1px solid  #e6e6e6',
        borderRadius: 4,
        height: '45px',
        marginBottom: theme.spacing.unit * 2.5,
    },
    amendBgColor: {
        background: amendColor,
    },
    inputLabelRoot: {
        color: 'rgba(0, 0, 0, 0.87)',
        position: 'relative',
    },
    inputLabelFocused: {
        color: 'rgba(0, 0, 0, 0.87) !important',
    },
    inputLabelAsterisk: {
        color: 'red',
    },
    inputLabelShrank: {
        fontSize: '.875rem',
        transform: 'translate(0, 0px) scale(1.0)',
        lineHeight: '20px',
        '&::after': {
            content: `url(${GreenTick})`,
            marginLeft: 15,
            display: 'none',
        },
    },
    inputHasSuccess: {
        '&::after': {
            display: 'inline-block',
        },
        '& + div > div': {
            borderColor: '#8fc255',
        },
    },
    inputHasError: {
        borderColor: '#eb5151',
    },
    searchIcon: {
        position: 'absolute',
        right: '5%',
        top: '25%',
    },
    loaderContainer: {
        width: '100%',
        height: 47,
        position: 'absolute',
        background: 'white',
        border: '1px solid  #e6e6e6',
        borderRadius: 4,
        marginTop: 0,
        top: 36,
        left: 0,
    },
    loader: {
        color: '#e6e6e6',
        marginTop: 10,
        marginLeft: 'calc(50% - 12.5px)',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
        '& > p': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '45px',
            height: 45,
        },
    },
    singleValue: {
        fontSize: '0.875rem',
    },
    placeholder: {
        position: 'absolute',
        left: 22,
        fontSize: '0.875rem',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: -20,
        left: 0,
        right: 0,
    },
});

function inputComponent({ inputRef, ...props }) {
    return <Typography component='div' ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                disableUnderline: true,
                inputProps: {
                    className: classNames(
                        props.selectProps.classes.inputTextField,
                        props.hasValue && props.selectProps.isAmend
                            ? props.selectProps.classes.amendBgColor
                            : null
                    ),
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component='div'
            style={{
                fontWeight: props.isSelected ? 500 : 400,
                fontSize: '0.875rem',
                height: '20px',
                padding: '10px',
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color='textSecondary'
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return (
        <Typography
            component='div'
            className={props.selectProps.classes.valueContainer}
        >
            {props.children}
        </Typography>
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class SelectMenu extends PureComponent {
    changeValue = (action, type) => value => {
        action({ value: value, type: type });
    };

    render() {
        const {
            label = '',
            required = false,
            success = false,
            loading = false,
            classes,
            theme,
            data = [],
            placeholder = this.placeholder,
            disableCondition = false,
            defaultValue = null,
            value,
            type = null,
            search = () => {},
            action = () => {},
            isAmend = false,
        } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        const loader = (
            <CircularProgress size='25px' className={classes.loader} />
        );

        // const searchIco = (
        //   <SearchIcon height="20px" color="e6e6e6" className={classes.searchIcon} />
        // );
        // menuIsOpen={false}

        return (
            <React.Fragment>
                <AsyncSelect
                    classes={classes}
                    styles={selectStyles}
                    defaultOptions={data}
                    loadOptions={search}
                    components={components}
                    isDisabled={disableCondition}
                    isAmend={isAmend}
                    onChange={this.changeValue(action, type)}
                    value={value}
                    placeholder={placeholder}
                    defaultValue={value || defaultValue}
                    isClearable
                    textFieldProps={{
                        helperText: loading ? loader : null,
                        FormHelperTextProps: {
                            component: 'div',
                            className: classes.loaderContainer,
                        },
                        required: required,
                        label: label,
                        InputLabelProps: {
                            shrink: true,
                            FormLabelClasses: {
                                asterisk: classes.inputLabelAsterisk,
                            },
                            classes: {
                                root: classes.inputLabelRoot,
                                focused: classes.inputLabelFocused,
                                shrink: success
                                    ? classNames(
                                          classes.inputLabelShrank,
                                          classes.inputHasSuccess
                                      )
                                    : classNames(classes.inputLabelShrank),
                            },
                        },
                    }}
                />
            </React.Fragment>
        );
    }
}

SelectMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const SelectFields = withStyles(styles, { withTheme: true })(SelectMenu);

export { SelectFields as default, SelectFields };
