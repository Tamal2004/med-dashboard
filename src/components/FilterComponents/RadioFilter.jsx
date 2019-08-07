import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import { AccordionFilterContainer } from './FilterContainer';
import { RadioControlLabel } from './ControlLabel';

const borderColor = '1px solid rgba(0, 0, 0, 0.12)';
const useStyles = makeStyles(theme => ({
	controlPadding: {
		paddingLeft: 16,
		borderLeft: borderColor,
		borderRight: borderColor
	}
}));

const RadioFilter = ({ data, onChange, title, value }) => {
	const c = useStyles();
	const getRandomId = () => Math.floor(Math.random() * 99 + 1); //between 1 to 99
	const tag = title.split(' ').join('-') + '-' + getRandomId();

	return (
		<AccordionFilterContainer tag={tag} title={title}>
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
