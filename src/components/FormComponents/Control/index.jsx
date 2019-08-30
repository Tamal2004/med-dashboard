import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Grid, FormLabel, Typography } from '@material-ui/core';
import { SelectBase } from 'components';

const Control = ({ required = false, label, isCard, memo, children, width }) => {
    const c = useStyles();
    return (
        <Grid container className={clsx(c.root, isCard && c.cardRoot)}>
            {label && (
                <Grid item xs={12 - width} className={c.left}>
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
                xs={label ? width : 12}
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
    width: 6
};

Control.propTypes = {
    label: PropTypes.string,
    memo: PropTypes.string,
    isCard: PropTypes.bool
};

export { Control as default, Control };
