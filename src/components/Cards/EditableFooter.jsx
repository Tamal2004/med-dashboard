import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import { Divider, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

// Local
import { IconedButton } from 'components';

const useStyles = makeStyles(({ spacing }) => ({
    divider: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    },
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: spacing(2)
    }
}));
const EditableFooter = ({ label, onClick }) => {
    const c = useStyles();
    return (
        <Fragment>
            <Divider className={c.divider} />
            <div className={c.root}>
                <IconedButton Icon={EditIcon} onClick={onClick}>
                    {label}
                </IconedButton>
            </div>
        </Fragment>
    );
};

EditableFooter.defaultProps = {
    label: 'Save Edits'
};

EditableFooter.propTypes = {
    label: PropTypes.string
};

export { EditableFooter as default, EditableFooter };
