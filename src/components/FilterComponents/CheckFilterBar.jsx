import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import { CheckControlLabel } from './ControlLabel';



const CheckFilterBar = ({ checked, data, onChange }) => {
	const isChecked = datum => checked.includes(datum);

	return (
		<FormControl fullWidth={true}>
			<FormGroup
				aria-label='check-filter-bar'
				name='check-filter-bar'
				onChange={onChange}
				row
			>
				{data.map((datum, idx) => (
					<CheckControlLabel
						key={idx}
						checked={isChecked(datum)}
						value={datum}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
};

CheckFilterBar.propTypes = {
	checked: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired
};

export { CheckFilterBar as default, CheckFilterBar };
