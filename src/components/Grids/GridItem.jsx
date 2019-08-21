import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			overflow: 'auto'
		}
	})
);

const GridItem = ({ xs = 12, sm = 6, md = 3, children, ...restProps }) => {
	const c = useStyles();

	return (
		<Grid
			item
			xs={xs}
			sm={sm}
			md={md}
			{...restProps}
			classes={{ root: c.root }}
		>
			{children}
		</Grid>
	);
};

GridItem.propTypes = {
	classes: PropTypes.object
};

export { GridItem as default, GridItem };
