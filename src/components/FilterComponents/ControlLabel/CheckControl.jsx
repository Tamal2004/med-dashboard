import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CheckboxBlankIcon, CheckboxFilledIcon } from 'assets';

const useStyles = makeStyles(theme => ({
	icon: { width: 21, height: 21 },
	labelRoot: { fontSize: '0.875rem' }
}));

const CheckControlLabel = ({ checked, value }) => {
	const c = useStyles();
	return (
		<FormControlLabel
			classes={{ label: c.labelRoot }}
			value={value}
			control={
				<Checkbox
					icon={<CheckboxBlankIcon className={c.icon} />}
					checkedIcon={<CheckboxFilledIcon className={c.icon} />}
					checked={checked}
					color='primary'
				/>
			}
			label={value}
			labelPlacement='end'
		/>
	);
};

export { CheckControlLabel as default, CheckControlLabel };
