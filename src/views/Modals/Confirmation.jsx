import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import { Divider, makeStyles, Typography } from '@material-ui/core';

// Local
import { ModalHeader, ModalFooter, ModalContent, Button } from 'components';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
    root: {
        width: breakpoints.values.sm,
        paddingLeft: `${spacing(2)}px !important`,
        paddingRight: `${spacing(2)}px !important`
    },
    footer: {
        padding: `${spacing(4)}px !important`,
        paddingBottom: `${spacing(2)}px !important`,
        paddingTop: `${spacing(2)}px !important`,
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ConfirmationModal = ({
    onClose,
    title,
    promptText,
    cancelText,
    submitText,
    submitColor,
    onSubmit
}) => {
    const c = useStyles();

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>{title}</ModalHeader>
            <ModalContent className={c.root}>
                <Typography variant='h6'>{promptText}</Typography>
            </ModalContent>
            <Divider />
            <ModalFooter className={c.footer}>
                <Button
                    variant='outlined'
                    color='secondary'
                    size='large'
                    onClick={onClose}
                >
                    {cancelText}
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={onSubmit}
                >
                    {submitText}
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

ConfirmationModal.defaultProps = {
    title: 'Edit',
    prompt: 'Are you sure?',
    cancelText: 'No',
    submitText: 'Yes',
};

ConfirmationModal.propTypes = {
    title: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export { ConfirmationModal as default, ConfirmationModal };
