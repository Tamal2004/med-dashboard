import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

// Material
import {
    Chip,
    Select,
    FormControl,
    MenuItem,
    Typography
} from '@material-ui/core';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

// Local
import useStyles from './styles';

// Libs
import { composeClasses } from 'libs';
import { Tooltip } from 'components';

const MultiSelectBase = ({
    styles,
    data,
    value,
    input: { onChange, ...input }
}) => {
    const c = composeClasses({ classes: useStyles(), styles });

    const handleChange = e => {
        const EventValue = e.target.value;
        let CurrentValue = value;

        CurrentValue = [
            ...EventValue.filter(item => CurrentValue.indexOf(item) === -1),
            ...CurrentValue.filter(item => EventValue.indexOf(item) !== -1)
        ];

        return onChange(CurrentValue);
    };

    const MenuProps = {
        disablePortal: true,
        getContentAnchorEl: null,
        transformOrigin: { vertical: -32, horizontal: 'right' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        classes: { paper: c.menu },
        MenuListProps: {
            disablePadding: true,
            className: c.menuItem
        }
    };

    return (
        <FormControl
            fullWidth
            className={clsx(c.control, value.length && c.success)}
        >
            <Select
                {...input}
                disableUnderline
                multiple
                classes={{
                    root: c.select,
                    icon: c.icon
                }}
                value={value}
                onChange={handleChange}
                renderValue={selected => (
                    <div className={c.chips}>
                        {selected.map(value => (
                            <Chip
                                key={value}
                                label={value}
                                className={c.chip}
                            />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
                IconComponent={DropdownIcon}
            >
                {data.map(name => (
                    <MenuItem key={name} value={name}>
                        <Tooltip title={name} dark>
                            <Typography className={c.menuText}>
                                {name}
                            </Typography>
                        </Tooltip>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const renderMultiSelect = ({ input: { value, ...input }, ...restProps }) => {
    const fixedValue = typeof value === 'string' ? [] : value;
    return <MultiSelectBase input={input} value={fixedValue} {...restProps} />;
};

MultiSelectBase.defaultProps = {
    data: [],
    styles: {}
};

MultiSelectBase.propTypes = {
    data: PropTypes.array.isRequired
};

const _MultiSelectBase = props => (
    <Field fieldName={props.name} component={renderMultiSelect} {...props} />
);

export { _MultiSelectBase as default, _MultiSelectBase as MultiSelectBase };
