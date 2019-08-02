import React from 'react';
import classNames from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import styles from './styles';

function ExpansionPanel(props) {
	const { classes, children, border } = props;
	return (
		<MuiExpansionPanel
			classes={{
				root: classNames(classes.root, border && classes.border)
			}}
		>
			{children}
		</MuiExpansionPanel>
	);
}

ExpansionPanel.defaultProps = {
	border: false
};

ExpansionPanel.propTypes = {
	border: PropTypes.bool
};

const _ExpansionPanel = withStyles(styles)(ExpansionPanel);

export { _ExpansionPanel as default, _ExpansionPanel as ExpansionPanel };
