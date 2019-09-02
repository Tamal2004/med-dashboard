import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { NavigateButton, withModal } from 'components';

//Local
import { ConfirmationModal } from 'views/Modals';
import { deleteOwnAccount } from 'actions';

const useStyles = makeStyles(theme => ({
	deleteBtn: {
		backgroundColor: '#d43c31',
		marginTop: 20,
		'&:hover': {
			backgroundColor: '#af332a'
		}
	}
}));

const CreateUser = ({ handleConfirmationModal, deleteOwnAccount, email }) => {
	const c = useStyles();

	const confirmationprops = {
		title: 'Confirmation',
		promptText:
			'Are you sure you want to delete your account? This action is irreversible.',
		cancelText: 'Cancel',
		submitText: 'Delete',
		onSubmit: () => deleteOwnAccount(email)
	};

	return (
		<NavigateButton
			className={c.deleteBtn}
			color='secondary'
			onClick={() => handleConfirmationModal(confirmationprops)}
		>
			DELETE ACCOUNT
		</NavigateButton>
	);
};

const mapModal = {
	handleConfirmationModal: ConfirmationModal
};

const mapState = ({ auth: { email } }) => ({
	email
});

const mapDispatch = {
	deleteOwnAccount
};

const _CreateUser = compose(
	connect(
		mapState,
		mapDispatch
	),
	withModal(mapModal)
)(CreateUser);

export { _CreateUser as default, _CreateUser as CreateUser };
