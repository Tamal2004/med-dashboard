import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = {};

const GridItem = ({ xs = 12, sm = 6, md = 3, children, ...restProps }) => (
	<Grid item xs={xs} sm={sm} md={md} {...restProps}>
		{children}
	</Grid>
);

GridItem.propTypes = {
	classes: PropTypes.object
};

const _GridItem = withStyles(styles)(GridItem);

export { _GridItem as default, _GridItem as GridItem };
