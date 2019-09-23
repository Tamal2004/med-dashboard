import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { NavigateButton, withModal } from 'components';

//Local
import { ConfirmationModal } from 'views/Modals';
import { deleteOwnAccount } from 'actions';

const useStyles = makeStyles(({ palette, spacing}) => ({
	deleteBtn: {
		backgroundColor: palette.error.main,
		marginTop: spacing(2.5),
		textTransform: 'none',
		'&:hover': {
			backgroundColor: palette.error.dark
		}
	}
}));

const DeleteUser = ({
	handleConfirmationModal,
	deleteOwnAccount,
	email,
	testerId
}) => {
	const c = useStyles();

	const confirmationProps = {
		title: 'Confirmation',
		promptText:
			'Are you sure you want to delete your account? This action is irreversible.',
		cancelText: 'Cancel',
		submitText: 'Delete',
		onSubmit: async () => await deleteOwnAccount(email, testerId)
	};

	return (
		<NavigateButton
			className={c.deleteBtn}
			color='secondary'
			onClick={() => handleConfirmationModal(confirmationProps)}
		>
			DELETE ACCOUNT
		</NavigateButton>
	);
};

const mapModal = {
	handleConfirmationModal: ConfirmationModal
};

const mapState = ({ auth: { email, testerId } }) => ({
	email,
	testerId
});

const mapDispatch = {
	deleteOwnAccount
};

const _DeleteUser = compose(
	connect(
		mapState,
		mapDispatch
	),
	withModal(mapModal)
)(DeleteUser);

export { _DeleteUser as default, _DeleteUser as DeleteUser };
