import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Grid, FormLabel, Typography } from '@material-ui/core';
import { SelectBase } from 'components';

const Control = ({ required = false, label, isCard, children }) => {
    const c = useStyles();
    return (
        <Grid container className={clsx(c.root, isCard && c.cardRoot)}>
            <Grid item xs={6} className={c.left}>
                <FormLabel
                    required={required}
                    className={clsx(c.label, isCard && c.cardLabel)}
                >
                    <Typography variant={isCard ? 'subtitle2' : 'subtitle1'}>
                        {label}
                    </Typography>
                </FormLabel>
            </Grid>
            <Grid item xs={6} className={c.right}>
                {children}
            </Grid>
        </Grid>
    );
};

Control.defaultProps = {
    required: false,
    isCard: false
};

Control.propTypes = {
    label: PropTypes.string.isRequired,
    isCard: PropTypes.bool
};

export { Control as default, Control };
