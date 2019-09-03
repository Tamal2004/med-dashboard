import React from 'react';
import PropTypes from 'prop-types';

// Material
import { Card, Grid, Typography, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

// Local
import useStyles from './styles';
import { TooltipIcon } from 'components';

const EditableCard = ({
    title,
    actionTitle,
    onEdit,
    color,
    children,
    isEditing
}) => {
    const c = useStyles();
    return (
        <Card className={c.root}>
            <Grid container className={c.header}>
                <Grid item sm={6} xs={12}>
                    <Typography variant='h6' className={c.title}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item sm={6} xs={12} className={c.actionContainer}>
                    {onEdit && (
                        <TooltipIcon
                            title={isEditing ? 'Close' : actionTitle}
                            Icon={isEditing ? CloseIcon : EditIcon}
                            onClick={onEdit}
                            color={color}
                        />
                    )}
                </Grid>
            </Grid>
            <Divider />
            <div className={c.content}>{children}</div>
        </Card>
    );
};

EditableCard.defaultProps = {
    actionTitle: 'Edit',
    color: 'secondary',
    isEditing: false
};

EditableCard.propTypes = {
    title: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    isEditing: PropTypes.bool,
    actionTitle: PropTypes.string
};

export { EditableCard as default, EditableCard };
