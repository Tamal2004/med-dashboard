import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import { AccordionFilterContainer } from './FilterContainer';
import { CheckControlLabel } from './ControlLabel';

const useStyles = makeStyles(theme => ({
	controlPadding: {
		paddingLeft: 16
	}
}));

const CheckFilter = ({ checked, data, onChange, title }) => {
	const c = useStyles();

	const isChecked = datum => checked.includes(datum);

	return (
		<AccordionFilterContainer title={title}>
			<FormControl className={c.controlPadding} fullWidth={true}>
				<FormGroup aria-label={title} name={title} onChange={onChange}>
					{data.map((datum, idx) => (
						<CheckControlLabel
							key={idx}
							checked={isChecked(datum)}
							value={datum}
						/>
					))}
				</FormGroup>
			</FormControl>
		</AccordionFilterContainer>
	);
};

CheckFilter.propTypes = {
	checked: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
};

export { CheckFilter as default, CheckFilter };
