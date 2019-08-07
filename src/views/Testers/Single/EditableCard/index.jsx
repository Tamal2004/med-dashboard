import React from 'react';
import PropTypes from 'prop-types';

// Material
import { Card, Grid, Typography, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import {
    GridContainer,
    GridItem,
    Table,
    TooltipIcon,
    Select,
    Input,
    MultiInput,
    Switch,
    NavigateButton
} from 'components';

const EditableCard = ({ title, actionTitle, onEdit, color, children }) => {
    const c = useStyles();
    return (
        <Card className={c.root}>
            <Grid container className={c.header}>
                <Grid item xs={6}>
                    <Typography variant='h6' className={c.title}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={6} className={c.actionContainer}>
                    {onEdit && (
                        <TooltipIcon
                            title={actionTitle}
                            Icon={EditIcon}
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
    color: 'secondary'
};

EditableCard.propTypes = {
    title: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    actionTitle: PropTypes.string
};

export { EditableCard as default, EditableCard };
