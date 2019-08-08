/*******************************************************
IMPLEMENTATION

<RadioFilter
	data={GENDERS}
	onChange={e =>
		onChange(e, FILTER_KEY['gender'], 'radio')
	}
	title={FILTER_KEY['gender']}
	value={getFilterValues(FILTER_KEY['gender'])}
/>
********************************************************/

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import { AccordionFilterContainer } from './FilterContainer';
import { RadioControlLabel } from './ControlLabel';

const useStyles = makeStyles(theme => ({
	controlPadding: {
		paddingLeft: 16
	}
}));

const RadioFilter = ({ data, onChange, title, value }) => {
	const c = useStyles();

	return (
		<AccordionFilterContainer title={title}>
			<FormControl className={c.controlPadding} fullWidth={true}>
				<RadioGroup
					aria-label={title}
					name={title}
					value={value}
					onChange={onChange}
				>
					{data.map((datum, idx) => (
						<RadioControlLabel key={idx} value={datum} />
					))}
				</RadioGroup>
			</FormControl>
		</AccordionFilterContainer>
	);
};

RadioFilter.defaultProps = {
	value: ''
};

RadioFilter.propTypes = {
	data: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export { RadioFilter as default, RadioFilter };
