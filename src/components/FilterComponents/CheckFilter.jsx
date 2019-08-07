import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';

import { AccordionFilterContainer } from './FilterContainer';
import { CheckControlLabel } from './ControlLabel';

const borderColor = '1px solid rgba(0, 0, 0, 0.12)';
const useStyles = makeStyles(theme => ({
	controlPadding: {
		paddingLeft: 16,
		borderLeft: borderColor,
		borderRight: borderColor
	}
}));

const CheckFilter = ({ checked, data, onChange, title }) => {
	const c = useStyles();
	const getRandomId = () => Math.floor(Math.random() * 99 + 1); //between 1 to 99
	const tag = title.split(' ').join('-') + '-' + getRandomId();

	const isChecked = datum => checked.includes(datum);

	return (
		<AccordionFilterContainer tag={tag} title={title}>
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
