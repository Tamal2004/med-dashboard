import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { change } from 'redux-form';

// Material
import {
    makeStyles,
    Grid,
    ButtonGroup,
    IconButton,
    Button
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import RemoveIcon from '@material-ui/icons/Delete';

// Local
import { DateInputBase, IconedButton } from 'components';
import { Control } from './Control';

const useStyles = makeStyles(({ palette, spacing, typography }) => ({
    root: {
        height: spacing(6)
    },
    cardRoot: {
        height: spacing(4),
        fontSize: typography['subtitle2'].fontSize,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    inactiveRoot: {
        border: 'unset',
        pointerEvents: 'none'
    },
    cardInput: {
        textAlign: 'left'
    },
    buttonGroup: {
        height: spacing(4),
        width: spacing(8)
    },
    buttonGrouped: {
        minWidth: 0,
        borderColor: palette.grey[300],
        '&:first-child': {
            borderLeftColor: 'transparent',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        },
        '&:hover': {
            borderColor: palette.grey[400]
        }
    },
    icon: {
        fontSize: typography['subtitle1'].fontSize,
        marginRight: 0,
        color: palette.secondary.main
    },
    iconRemove: {
        color: palette.primary.main
    }
}));

const DateInput = ({
    required = false,
    label,
    isCard,
    active,
    name,
    change,
    ...restProps
}) => {
    const [form, setForm] = useState(undefined);
    const { cardRoot, inactiveRoot, cardInput, ...c } = useStyles();

    const dateInputStyles = {
        ...c,
        root: clsx(c.root, isCard && cardRoot, !active && inactiveRoot),
        input: isCard && cardInput
    };
    const controlProps = { required, label, isCard };

    return (
        <Control {...controlProps}>
            <Grid container>
                <Grid item xs={isCard ? 8 : 12}>
                    <DateInputBase
                        handleForm={form => setForm(form)}
                        styles={dateInputStyles}
                        name={name}
                        {...restProps}
                    />
                </Grid>
                {isCard && active && (
                    <Grid item xs={4}>
                        <ButtonGroup
                            classes={{
                                root: c.buttonGroup,
                                grouped: c.buttonGrouped
                            }}
                            color='inherit'
                        >
                            <IconedButton
                                Icon={TodayIcon}
                                styles={{ icon: c.icon }}
                                onClick={() => change(form, name, new Date())}
                            />
                            <IconedButton
                                Icon={RemoveIcon}
                                styles={{ icon: clsx(c.icon, c.iconRemove )}}
                                onClick={() => change(form, name, '')}
                            />
                        </ButtonGroup>
                    </Grid>
                )}
            </Grid>
        </Control>
    );
};

DateInput.defaultProps = {
    isCard: false,
    active: true
};

DateInput.propTypes = {
    isCard: PropTypes.bool,
    active: PropTypes.bool
};

const mapDispatch = { change };

const _DateInput = connect(
    void 0,
    mapDispatch
)(DateInput);

export { _DateInput as default, _DateInput as DateInput };
