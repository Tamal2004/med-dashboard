import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

import { AccordionFilterContainer } from './FilterContainer';

const useStyles = makeStyles(theme => ({
	gridContainer: {
		padding: 16
	}
}));

const RangeFilter = ({ value, onChange, title }) => {
	const c = useStyles();
	const getRandomId = () => Math.floor(Math.random() * 99 + 1); //between 1 to 99
	const tag = title.split(' ').join('-') + '-' + getRandomId();

	const handleBlur = () => {
		console.log('handleBlur');
	};

	console.log('Inside RangeFilter', value);
	return (
		<AccordionFilterContainer tag={tag} title={title}>
			<Grid
				container
				spacing={2}
				className={c.gridContainer}
				alignItems='center'
			>
				<Grid md={9} item>
					<Slider
						valueLabelDisplay='auto'
						value={typeof value === 'number' ? value : 0}
						onChange={onChange}
						aria-labelledby={tag}
						getAriaValueText={() => value}
					/>
				</Grid>
				<Grid md={3} item>
					<Input
						value={typeof value === 'number' ? value : 0}
						margin='dense'
						onChange={onChange}
						onBlur={handleBlur}
						inputProps={{
							step: 10,
							min: 0,
							max: 100,
							type: 'number',
							'aria-labelledby': tag
						}}
					/>
				</Grid>
			</Grid>
		</AccordionFilterContainer>
	);
};

RangeFilter.propTypes = {
	title: PropTypes.string.isRequired
};

export { RangeFilter as default, RangeFilter };
