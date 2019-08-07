import React from 'react';

import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
	labelRoot: { fontSize: '0.875rem' },
	radioIcon: { '& svg': { width: 21, height: 21 } }
}));

const RadioControlLabel = ({ value }) => {
	const c = useStyles();
	return (
		<FormControlLabel
			classes={{ label: c.labelRoot }}
			value={value}
			control={<Radio classes={{ root: c.radioIcon }} color='primary' />}
			label={value}
			labelPlacement='end'
		/>
	);
};

export { RadioControlLabel as default, RadioControlLabel };
