import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles/index';
import { NavigateButton, withModal, GridContainer, GridItem } from 'components';

//Local
import ResetAccount from './ResetAccount';
import { ConfirmationModal } from 'views/Modals';
import { deleteOwnAccount } from 'actions';

const useStyles = makeStyles(({ palette, spacing }) => ({
    deleteBtn: {
        backgroundColor: palette.error.main,
        marginTop: spacing(2.5),
        textTransform: 'none',
        '&:hover': {
            backgroundColor: palette.error.dark
        }
    }
}));

const AdminHome = ({
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

    return <ResetAccount />;
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

const _AdminHome = compose(
    connect(
        mapState,
        mapDispatch
    ),
    withModal(mapModal)
)(AdminHome);

export { _AdminHome as default, _AdminHome as AdminHome };
