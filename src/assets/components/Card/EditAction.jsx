import React from 'react';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './actionStyles';
import EditIcon from '../Icons/EditIcon';
import { Tooltip } from 'components';

const EditAction = ({ classes: c, ...props }) => (
    <Tooltip onClick={props.onClick} title='Edit it!'>
        <EditIcon className={c.root} />
    </Tooltip>
);

const _EditAction = withStyles(styles)(EditAction);

export { _EditAction as default, _EditAction as EditAction };
