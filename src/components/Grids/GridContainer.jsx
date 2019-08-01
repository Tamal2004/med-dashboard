import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const style = ({ palette, spacing }) => ({
    divider: {
        borderTop: '1px solid',
        borderColor: palette.grey[300],
        marginTop: spacing.unit * 3,
        paddingTop: spacing.unit
    }
});

function GridContainer(props) {
    const {
        classes: c,
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
            className={classNames(className, hasDivider && c.divider)}
            {...restProps}
        >
            {children}
        </Grid>
    );
}

GridContainer.defaultProps = {
    justify: 'center',
    spacing: 40,
    hasDivider: false
};

GridContainer.propTypes = {
    classes: PropTypes.object,
    justify: PropTypes.string,
    spacing: PropTypes.number,
    hasDivider: PropTypes.bool
};

const _GridContainer = withStyles(style)(GridContainer);

export { _GridContainer as default, _GridContainer as GridContainer };
