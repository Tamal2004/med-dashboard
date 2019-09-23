import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import { Divider, makeStyles } from '@material-ui/core';

// Local
import {
    ModalHeader,
    ModalFooter,
    ModalContent,
    Button,
    Input,
    DateInput,
    MultiInput,
    Control,
    Select
} from 'components';

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

const EditModal = ({ formData, onClose, handleSubmit, dirty, title,pristine }) => {
    const c = useStyles();

    const rows = formData.map(({ label, key, type, props }, index) => {
        switch (type) {
            case 'DateInput':
                return (
                    <DateInput
                        key={index}
                        label={label}
                        name={key}
                        {...props}
                    />
                );
            case 'MultiInput':
                return (
                    <Fragment key={index}>
                        <Control label={label} />
                        <MultiInput name={key} {...props} />
                    </Fragment>
                );
            case 'Select':
                return <Select key={key} name={key} label={label} {...props} />;
            default:
                return (
                    <Input key={index} label={label} name={key} {...props} />
                );
        }
    });

    return (
        <Fragment>
            <ModalHeader onClose={onClose}>{title}</ModalHeader>
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
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={async () => {
                        if (dirty) return await handleSubmit();
                        else return onClose();
                    }}
                    enableLoader
                    disabled={pristine}
                >
                    Update
                </Button>
            </ModalFooter>
        </Fragment>
    );
};

EditModal.defaultProps = {
    title: 'Edit'
};

EditModal.propTypes = {
    title: PropTypes.string.isRequired
};

export { EditModal as default, EditModal };
