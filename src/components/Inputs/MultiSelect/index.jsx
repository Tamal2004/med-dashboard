import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DropdownIcon from '@material-ui/icons/KeyboardArrowDown';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const useStyles = makeStyles(({ spacing, palette, shape }) => ({
	gridContainer: {
		padding: 16
	},
	buttonPosition: {
		marginRight: 16,
		float: 'right'
	},
	formControl: {
		minWidth: 120,
		border: '1px solid',
		borderColor: palette.grey[500]
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2,
		width: '100%',
		borderRadius: shape.borderRadius
	},
	noLabel: {
		marginTop: spacing(3)
	},
	temp: {
		background: 'tomato',
		'&::before': {
			content: "'aa'"
		}
	},
	selectRoot: {
		'&:focus': {
			backgroundColor: 'unset'
		}
	}
}));

const MultiSelect = ({ data, onChange, value }) => {
	const c = useStyles();

	const handleChange = e => {
		const EventValue = e.target.value;
		let CurrentValue = value;

		CurrentValue = [
			...EventValue.filter(item => CurrentValue.indexOf(item) === -1),
			...CurrentValue.filter(item => EventValue.indexOf(item) !== -1)
		];

		return onChange(CurrentValue);
	};

	return (
		<Fragment>
			<FormControl fullWidth className={c.formControl}>
				<Select
					placeholder='Please select...'
					disableUnderline
					multiple
					classes={{ root: c.selectRoot }}
					value={value || []}
					onChange={handleChange}
					renderValue={selected => (
						<div className={c.chips}>
							{selected.map(value => (
								<Chip
									key={value}
									label={value}
									className={c.chip}
								/>
							))}
						</div>
					)}
					MenuProps={MenuProps}
					IconComponent={DropdownIcon}
				>
					{data.map(name => (
						<MenuItem key={name} value={name}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Fragment>
	);
};

MultiSelect.defaultProps = {
	data: [],
	title: '',
	onChange: () => {},
	value: []
};

MultiSelect.propTypes = {
	data: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	title: PropTypes.string.isRequired,
	value: PropTypes.array.isRequired
};

export { MultiSelect as default, MultiSelect };
