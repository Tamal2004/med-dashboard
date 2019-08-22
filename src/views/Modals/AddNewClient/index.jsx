import React, { Fragment } from 'react';
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

const AddNewClient = ({ onClose }) => {
	const c = useStyles();

	return (
		<Fragment>
			<ModalHeader onClose={onClose}>Add new client</ModalHeader>
			<ModalContent className={c.root}>
				<Input label='Client Name' name='name' />
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

AddNewClient.defaultProps = {};

AddNewClient.propTypes = {};

const mapDispatch = {};

const _AddNewClient = compose(
	connect(
		null,
		mapDispatch
	),
	reduxForm({
		form: 'NewClient'
	})
)(AddNewClient);

export { _AddNewClient as default, _AddNewClient as AddNewClient };
