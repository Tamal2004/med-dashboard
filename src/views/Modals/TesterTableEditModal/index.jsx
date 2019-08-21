import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

// Material
import { Divider } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
	ModalHeader,
	ModalFooter,
	ModalContent,
	Button,
	Input
} from 'components';

import { selectTester } from 'selectors';

const map = () => console.log('map');

const TesterTableEdit = ({ tester, onClose, initialValues }) => {
	const c = useStyles();

	const name = value => value.split(' ').join('');
	const rows = [];

	console.log('tester', tester);
	// initialValues(mappedObj);

	Object.keys(tester).forEach((key, index) =>
		rows.push(
			<Input
				key={index}
				label={key}
				name={name(key)}
				value={tester[key]}
			/>
		)
	);

	useEffect(() => {
		map();
	});

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
					Add Session
				</Button>
			</ModalFooter>
		</Fragment>
	);
};

TesterTableEdit.defaultProps = {};

TesterTableEdit.propTypes = {};

const mapState = (state, { editiIndex }) => {
	const tester = selectTester(state, editiIndex);
	const name = value => value.split(' ').join('');
	const mappedObj = {};
	Object.keys(tester).forEach(key => (mappedObj[name(key)] = tester[key]));

	return {
		tester,
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
