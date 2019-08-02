import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import styles from './styles';

function ExpansionPanelDetails(props) {
	const { classes, children, border } = props;
	return (
		<MuiExpansionPanelDetails
			classes={{
				root: classNames(classes.root, border && classes.border)
			}}
		>
			{children}
		</MuiExpansionPanelDetails>
	);
}

ExpansionPanelDetails.defaultProps = {
	border: false
};

ExpansionPanelDetails.propTypes = {
	border: PropTypes.bool
};

const _ExpansionPanelDetails = withStyles(styles)(ExpansionPanelDetails);

export {
	_ExpansionPanelDetails as default,
	_ExpansionPanelDetails as ExpansionPanelDetails
};
