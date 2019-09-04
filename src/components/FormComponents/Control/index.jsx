import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Grid, FormLabel, Typography } from '@material-ui/core';
import { SelectBase } from 'components';

const Control = ({
    required = false,
    label,
    isCard,
    memo,
    children,
    width,
    isError,
    error
}) => {
    const c = useStyles();
    console.log('error', error)
    return (
        <Grid container className={clsx(c.root, isCard && c.cardRoot)}>
            {label && (
                <Grid item sm={12 - width} xs={12} className={c.left}>
                    <FormLabel
                        required={required}
                        className={clsx(c.label, isCard && c.cardLabel)}
                    >
                        <Typography
                            className={c.labelText}
                            variant={isCard ? 'subtitle2' : 'subtitle1'}
                        >
                            {label}
                        </Typography>
                        <span className={c.required}>{error}</span>
                    </FormLabel>
                    {memo && (
                        <Typography className={c.memo} variant='subtitle2'>
                            {memo}
                        </Typography>
                    )}
                </Grid>
            )}
            <Grid
                item
                sm={label ? width : 12}
                xs={12}
                className={clsx(c.right, !label && c.noLabelRight)}
            >
                {children}
            </Grid>
        </Grid>
    );
};

Control.defaultProps = {
    required: false,
    isCard: false,
    isCompact: false,
    width: 6,
    isError: false
};

Control.propTypes = {
    label: PropTypes.string,
    memo: PropTypes.string,
    isCard: PropTypes.bool
};

export { Control as default, Control };
