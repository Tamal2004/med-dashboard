import React from 'react';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Grid, FormLabel, Typography } from '@material-ui/core';
import { SelectBase } from 'components';

const Control = ({ required = false, label, children }) => {
    const c = useStyles();
    return (
        <Grid container className={c.root}>
            <Grid item xs={6} className={c.left}>
                <FormLabel required={required} className={c.label}>
                    <Typography variant='subtitle1'>{label}</Typography>
                </FormLabel>
            </Grid>
            <Grid item xs={6} className={c.right}>
                {children}
            </Grid>
        </Grid>
    );
};

Control.defaultProps = {
    required: false
};

Control.propTypes = {
    label: PropTypes.string.isRequired,
};

export { Control as default, Control };
