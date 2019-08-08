import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
const ExpansionPanelSummary = withStyles(theme => {
	return {
		root: {
			backgroundColor: theme.palette.common.white,
			borderBottom: `1px solid ${theme.palette.grey[200]}`,
			marginBottom: -1,
			padding: '0 16px 0 16px',
			minHeight: '48px',
			margin: 0
		},
		expanded: {
			minHeight: '48px !important',
			margin: 0
		},
		content: {
			alignItems: 'center',
			margin: 0,
			'&$expanded': { minHeight: 'auto', margin: 0 }
		}
	};
})(MuiExpansionPanelSummary);

const SearchExpansionPanelSummary = withStyles(theme => {
	return {
		root: {
			backgroundColor: theme.palette.common.white,
			border: `1px solid ${theme.palette.grey[200]}`,
			marginBottom: -1,
			padding: '0 16px 0 16px',
			minHeight: '48px',
			margin: 0
		},
		expanded: {
			minHeight: '48px !important',
			margin: 0
		},
		content: {
			alignItems: 'center',
			margin: 0,
			'&$expanded': { minHeight: 'auto', margin: 0 }
		}
	};
})(MuiExpansionPanelSummary);

export {
	ExpansionPanelSummary as default,
	ExpansionPanelSummary,
	SearchExpansionPanelSummary
};
