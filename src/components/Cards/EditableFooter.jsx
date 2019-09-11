import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

// Local
import { IconedButton } from 'components';
import CardDivider from './CardDivider';

const useStyles = makeStyles(({ spacing }) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: spacing(2)
    }
}));
const EditableFooter = ({ label, onClick, disabled }) => {
    const c = useStyles();
    return (
        <Fragment>
            <CardDivider />
            <div className={c.root}>
                <IconedButton
                    Icon={EditIcon}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {label}
                </IconedButton>
            </div>
        </Fragment>
    );
};

EditableFooter.defaultProps = {
    label: 'Save Edits',
    disabled: false
};

EditableFooter.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool
};

export { EditableFooter as default, EditableFooter };
