import React from 'react';
import classNames from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        background: '#fff'
    },
    divider: {
        borderTop: '1px solid',
        borderColor: theme.palette.grey[300],
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(1)
    }
}));

function GridContainer(props) {
    const c = useStyles();
    const {
        justify,
        spacing,
        children,
        className,
        hasDivider,
        ...restProps
    } = props;
    return (
        <Grid
            container
            justify={justify}
            spacing={spacing}
            className={classNames(c.root, className, hasDivider && c.divider)}
            {...restProps}
        >
            {children}
        </Grid>
    );
}

GridContainer.defaultProps = {
    justify: 'center',
    spacing: 2,
    hasDivider: false
};

GridContainer.propTypes = {
    classes: PropTypes.object,
    justify: PropTypes.string,
    spacing: PropTypes.number,
    hasDivider: PropTypes.bool
};

export { GridContainer as default, GridContainer };
