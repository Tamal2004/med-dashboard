import React, { Component } from 'react';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
} from 'body-scroll-lock';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material
import {
    Backdrop,
    Select as MuiSelect,
    MenuItem,
    TextField,
    FormControl,
    ClickAwayListener
} from '@material-ui/core';

// Local
import { LabelBase } from 'components';
import { composeClasses } from 'libs';
import SelectCancellableIcon from './SelectCancellableIcon';
import SelectDropdownIcon from './SelectDropdownIcon';
import SelectPlaceholder from './SelectPlaceholder';

// Todo: First click after load is eaten up, fix
/*
 * Domain: --
 * Page: Select
 * Component: Base
 * Type: --
 * SelectBase
 */
class Select extends Component {
    targetRef = React.createRef();
    targetElement = null;
    // Set prop types
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
        isCancellable: PropTypes.bool,
        displayFirst: PropTypes.bool,
        placeholder: PropTypes.string
    };

    // Set default props
    static defaultProps = {
        styles: {},
        displayFirst: false,
        isCancellable: false,
        placeholder: null,
        disableRenderLimit: false
    };

    state = {
        data: this.props.data,
        initialData: this.props.data,
        queryValue: '',
        selectFocus: false,
        textFocus: false,
        selectStyle: null,
        placeholderStyle: null,
        showPlaceholder: Boolean(this.props.placeholder),
    };

    componentDidMount() {
        const {
            input: { onChange },
            data,
            displayFirst
        } = this.props;

        if (displayFirst) onChange(data[0]);

        this.targetElement = this.targetRef.current;
    }

    componentWillUnmount() {
        clearAllBodyScrollLocks();
    }

    static getDerivedStateFromProps(props, state) {
        const { queryValue } = state;

        const {
            classes: { select, selectCancellable, selectQuery },
            isCancellable,
            styles,
            meta: { dirty, ...meta },
            placeholder,
            handleError
        } = props;

        if (meta.touched && !!meta.error) handleError(meta.error);
        else handleError('');

        const nextState = {
            selectStyle: classNames(select, styles.select),
            showPlaceholder: Boolean(placeholder)
        };

        if (isCancellable && dirty) {
            nextState.selectStyle = classNames(
                nextState.selectStyle,
                selectCancellable
            );
        }

        // There's no other way <-- Efficient though
        if (Boolean(queryValue)) {
            if (dirty) {
                nextState.selectStyle = classNames(
                    nextState.selectStyle,
                    selectQuery
                );
            } else {
                if (Boolean(placeholder)) {
                    nextState.showPlaceholder = false;
                }
            }
        }

        return nextState;
    }

    onQuery = ({ target: { value: queryValue } }) => {
        const { state } = this;
        const { initialData, selectFocus } = state;

        if (selectFocus) {
            const data = initialData.filter(({ label }) => {
                return (
                    queryValue === '' ||
                    label.toLowerCase().includes(queryValue.toLowerCase())
                );
            });

            this.setState({ data, queryValue });
        } else this.setState({ selectFocus: true });
    };

    onBlur = () => {
        this.setState({
            selectFocus: false,
            queryValue: '',
            data: this.state.initialData
        });
        this.props.input.onBlur();
        enableBodyScroll(this.targetElement);
    };

    onFocus = () => {
        this.setState({ selectFocus: true });
        this.props.input.onFocus();
        disableBodyScroll(this.targetElement);
    };

    onChange = value => {
        this.setState({ queryValue: '', data: this.state.initialData });
        this.props.input.onChange(value);
    };

    renderDropdownIcon = () => {
        const { props, onFocus } = this;
        const { styles = {}, disabled } = props;
        const propStyles = Object.splice(styles, [
            'dropdownRoot',
            'dropdownIcon'
        ]);
        return (
            <SelectDropdownIcon
                styles={propStyles}
                onClick={onFocus}
                disabled={disabled}
            />
        );
    };

    anchorEl = React.createRef();
    render() {
        const {
            state,
            props,
            renderDropdownIcon,
            onQuery,
            onBlur,
            onFocus,
            onChange
        } = this;

        const {
            queryValue,
            data,
            selectFocus,
            selectStyle,
            showPlaceholder
        } = state;

        const {
            classes,
            styles,
            input,
            meta: { dirty, form, ...meta },
            isCancellable,
            placeholder: placeholderValue,
            className,
            label,
            required,
            disabled,
            displayFirst, // Take out of restProps
            handleError,
            unitHeight,
            disableRenderLimit,
            ...restProps
        } = props;

        const c = composeClasses({
            classes: { ...classes, select: selectStyle },
            styles
        });

        const { name, value } = input;
        const {
            onFocus: noFocus, // naming conflict
            onBlur: noBlur, // naming conflict
            onChange: noChange, // naming conflict
            ...inputProps
        } = input;

        const selectProps = {
            MenuProps: {
                classes: { paper: c.list },
                MenuListProps: {
                    disablePadding: true,
                    className: c.listItem
                },
                getContentAnchorEl: null,
                transformOrigin: { vertical: 1 - unitHeight, horizontal: 0 },
                disableAutoFocusItem: true,
                disableAutoFocus: true,
                disablePortal: true,
                disableEnforceFocus: true,
                disableRestoreFocus: true
            },
            classes: { ...Object.splice(c, ['root', 'select', 'icon']) },
            IconComponent: renderDropdownIcon,
            disableUnderline: true,
            ...inputProps,
            ...restProps,
            inputProps,
            open: !disabled && selectFocus,
            onClose: onBlur,
            onOpen: onFocus,
            onChange,
            disabled
        };
        const id = `${form}-${name}`;
        const valid = isNaN(value) ? !!value : !!Number(value);
        const success = !disabled && valid;
        const error = meta.touched && !!meta.error;

        // Todo: refactor later into query
        let renderFloor = 0;
        let renderCeiling = this.props.data.length;

        if (!disableRenderLimit) {
            const valueIndex = this.props.data
                .map(({ value }) => value)
                .indexOf(input.value);

            renderFloor = queryValue || valueIndex < 10 ? 0 : valueIndex - 10;

            renderCeiling =
                queryValue || valueIndex < 10 ? 20 : renderFloor + 20;
        }

        return (
            <ClickAwayListener
                onClickAway={() => this.state.selectFocus && onBlur()}
            >
                <FormControl className={c.container} ref={this.anchorEl}>
                    {label && (
                        <LabelBase
                            label={label}
                            disabled={disabled}
                            required={required}
                            success={success}
                            htmlFor={id}
                        />
                    )}
                    <FormControl
                        className={classNames(
                            c.control,
                            className,
                            error && c.error,
                            success && c.success,
                            disabled && c.disabled
                        )}
                        ref={this.anchorEl}
                    >
                        {/*Todo: Convert to InputBase element */}
                        <TextField
                            classes={{
                                root: classNames(c.inputRoot, selectFocus)
                            }}
                            inputProps={{ className: c.input }}
                            value={queryValue}
                            onChange={onQuery}
                            htmlFor={id}
                            onClick={onFocus}
                            disabled={disabled}
                            ref={this.targetRef}
                        />
                        <Backdrop
                            ref={this.targetRef}
                            classes={{ root: c.backdrop }}
                            open={this.state.selectFocus}
                            invisible
                            onClick={() => onBlur()}
                        />
                        {showPlaceholder && !success && !disabled && (
                            <SelectPlaceholder
                                styles={Object.splice(c, ['placeholder'])}
                                htmlFor={id}
                                placeholder={placeholderValue}
                            />
                        )}
                        {isCancellable && success && (
                            <SelectCancellableIcon
                                styles={Object.splice(styles, [
                                    'cancellableRoot',
                                    'cancellableIcon'
                                ])}
                                onClick={() => onChange('')}
                            />
                        )}
                        <MuiSelect {...selectProps}>
                            {data.map(
                                ({ value, label }, index) =>
                                    index >= renderFloor &&
                                    index < renderCeiling && (
                                        <MenuItem
                                            key={id + index}
                                            value={value}
                                        >
                                            {label}
                                        </MenuItem>
                                    )
                            )}
                        </MuiSelect>
                    </FormControl>
                </FormControl>
            </ClickAwayListener>
        );
    }
}

export { Select as default, Select };
