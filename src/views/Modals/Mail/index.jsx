import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { validateRequired } from 'libs';
import {
	ModalHeader,
	ModalFooter,
	ModalContent,
	Divider,
	Button,
	Select,
	Input,
	MultiInput
} from 'components';

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.sm,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	gridContainer: {
		padding: 16
	},
	footer: {
		padding: theme.spacing(4),
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'flex-end'
	}
}));

const TesterMailModal = ({ change, onClose }) => {
	const c = useStyles();

	return (
		<Fragment>
			<ModalHeader onClose={onClose}>Mail Tester(s)</ModalHeader>
			<ModalContent className={c.root}>
				{/*conditionally disabled if has data*/}
				<Select label='From' name='from' data={[]} required />
				{/*conditionally disabled if has data*/}
				<Select label='To' name='to' data={[]} required />

				<Input
					label='Subject'
					name='subject'
					placeholder='Subject'
					required
				/>

				<Select label='Project' name='project' data={[]} />
				<Select label='Contact type' name='contactType' data={[]} />
				<MultiInput name='body' placeholder='Write something....' />
			</ModalContent>
			<Divider />
			<ModalFooter className={c.footer}>
				<Button size='large'>Send Mail</Button>
			</ModalFooter>
		</Fragment>
	);
};

const validate = values => {
	const required = [];

	return { ...validateRequired(values, required) };
};

const mapState = state => {
	const selector = formValueSelector('TesterMailModal');
	const to = selector(state, 'to');

	return {
		to
	};
};

const mapDispatch = {
	change
};

const _TesterMailModal = compose(
	connect(
		mapState,
		mapDispatch
	),
	reduxForm({
		form: 'TesterMailModal',
		validate,
		initialValues: {
			to: []
		}
	})
)(TesterMailModal);

export { _TesterMailModal as default, _TesterMailModal as TesterMailModal };
