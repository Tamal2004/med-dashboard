import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import {
	ModalHeader,
	ModalFooter,
	ModalContent,
	Button,
	Input
} from 'components';

import { selectTester } from 'selectors';

const TesterTableEdit = ({ formData, onClose }) => {
	const c = useStyles();
	const rows = [];

	formData.map((segment, index) =>
		rows.push(
			<Input key={index} label={segment.label} name={segment.key} />
		)
	);

	return (
		<Fragment>
			<ModalHeader onClose={onClose}>Edit tester</ModalHeader>
			<ModalContent className={c.root}>
				<Fragment>{rows}</Fragment>
			</ModalContent>
			<Divider />
			<ModalFooter className={c.footer}>
				<Button
					variant='outlined'
					color='secondary'
					size='large'
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button variant='contained' color='primary' size='large'>
					Update
				</Button>
			</ModalFooter>
		</Fragment>
	);
};

TesterTableEdit.defaultProps = {};

TesterTableEdit.propTypes = {};

const mapState = (state, { editiIndex }) => {
	//initial method and variables
	const name = value => value.split(' ').join('');
	const mappedObj = {};
	const formData = [];

	//selector and mapping
	const tester = selectTester(state, editiIndex);
	Object.keys(tester).forEach(key => {
		mappedObj[name(key)] = tester[key];
		formData.push({ key: name(key), label: key });
	});

	return {
		formData,
		initialValues: mappedObj
	};
};
const mapDispatch = {};

const _TesterTableEdit = compose(
	connect(
		mapState,
		mapDispatch
	),
	reduxForm({
		form: 'TesterTable'
	})
)(TesterTableEdit);

export { _TesterTableEdit as default, _TesterTableEdit as TesterTableEdit };
