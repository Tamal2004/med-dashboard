import React from 'react';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './actionStyles';
import DeleteIcon from '../Icons/DeleteIcon';
import { Tooltip } from 'components';

const DeleteAction = ({ classes: c, ...props }) => (
    <Tooltip onClick={props.onClick} title='Delete it!'>
        <DeleteIcon className={c.root} />
    </Tooltip>
);

const _DeleteAction = withStyles(styles)(DeleteAction);

export { _DeleteAction as default, _DeleteAction as DeleteAction };
