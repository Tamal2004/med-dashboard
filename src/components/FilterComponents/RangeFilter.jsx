/*******************************************************
IMPLEMENTATION

<RangeFilter
	title={FILTER_KEY['age']}
	onChange={(e, value) =>
		onChange(e, FILTER_KEY['age'], 'range', value)
	}
	value={getFilterValues(FILTER_KEY['age'])}
/>
********************************************************/

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/core/Slider';

import Input from '@material-ui/core/Input';

import { AccordionFilterContainer } from './FilterContainer';

const useStyles = makeStyles(theme => ({
	gridContainer: {
		margin: 0,
		padding: 9,
		width: '100%'
	}
}));

const RangeFilter = ({ value, onChange, title, step, min, max }) => {
	const c = useStyles();

	const handleChange = e => onChange(e, e.target.value);

	return (
		<AccordionFilterContainer title={title}>
			<Grid
				container
				spacing={2}
				className={c.gridContainer}
				alignItems='center'
			>
				<Grid md={9} item>
					<Slider
						valueLabelDisplay='auto'
						value={Number(value)}
						onChange={onChange}
						aria-labelledby={title}
						getAriaValueText={() => value}
						step={step}
						min={min}
						max={max}
						marks
					/>
				</Grid>
				<Grid md={3} item>
					<Input
						value={Number(value)}
						margin='dense'
						onChange={handleChange}
						inputProps={{
							step: step,
							min: min,
							max: max,
							type: 'number',
							'aria-labelledby': title
						}}
					/>
				</Grid>
			</Grid>
		</AccordionFilterContainer>
	);
};

RangeFilter.defaultProps = {
	step: 1,
	max: 100,
	min: 0
};
RangeFilter.propTypes = {
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number,
	title: PropTypes.string.isRequired
};

export { RangeFilter as default, RangeFilter };
