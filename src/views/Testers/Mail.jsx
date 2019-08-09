import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { validateRequired } from 'libs';
import {
	GridContainer,
	GridItem,
	Button,
	Select,
	Input,
	MultiInput,
	MultiSelect
} from 'components';

const useStyles = makeStyles(theme => ({
	gridContainer: {
		padding: 16
	},
	buttonPosition: {
		marginRight: 16,
		float: 'right'
	}
}));

const GridWrapper = ({ children, ...restProps }) => {
	const c = useStyles();
	return (
		<GridContainer
			className={c.gridContainer}
			alignItems='flex-end'
			{...restProps}
		>
			{children}
		</GridContainer>
	);
};

const names = [
	'Oliver Hansen',
	'Van Henry',
	'April Tucker',
	'Ralph Hubbard',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder'
];

const TesterMail = props => {
	const c = useStyles();

	function handleChange(value) {
		console.log(value);
		// console.log('props', props.to);
		// const EventValue = event.target.value;
		// let ToValue = props.to;

		// ToValue = [
		// 	...EventValue.filter(item => ToValue.indexOf(item) === -1),
		// 	...ToValue.filter(item => EventValue.indexOf(item) !== -1)
		// ];

		// console.log('finalValue', ToValue);
		// setPersonName(event.target.value);
		props.change('to', value);
	}

	return (
		<Fragment>
			<GridWrapper>
				<Typography align='center' variant='h6'>
					Mail Testers
				</Typography>
			</GridWrapper>
			<GridWrapper>
				<GridItem md={8} xs={12}>
					{/*conditionally disabled if has data*/}
					<Select label='From' name='from' data={[]} required />
					{/*conditionally disabled if has data*/}
					<Select label='To' name='to' data={[]} required />

					<MultiSelect
						label='To'
						data={names}
						value={props.to}
						onChange={handleChange}
					/>

					<Input
						label='Subject'
						name='subject'
						placeholder='Subject'
						required
					/>

					<Select label='Project' name='project' data={[]} />
					<Select label='Contact type' name='contactType' data={[]} />
					<MultiInput name='body' placeholder='Write something....' />
				</GridItem>
				<GridItem md={8} xs={12}>
					<Button className={c.buttonPosition} size='large'>
						Send Mail
					</Button>
				</GridItem>
			</GridWrapper>
		</Fragment>
	);
};

const validate = values => {
	const required = [];

	return { ...validateRequired(values, required) };
};

const mapState = state => {
	const selector = formValueSelector('TesterMail');
	const to = selector(state, 'to');

	return {
		to
	};
};

const mapDispatch = {
	change
};

const _TesterMail = compose(
	connect(
		mapState,
		mapDispatch
	),
	reduxForm({
		form: 'TesterMail',
		validate,
		initialValues: {
			to: []
		}
	})
)(TesterMail);

export { _TesterMail as default, _TesterMail as TesterMail };
