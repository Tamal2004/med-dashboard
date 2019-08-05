import React from 'react';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './actionStyles';
import CopyIcon from '../Icons/CopyIcon';
import { Tooltip } from 'components';

const CopyAction = ({ classes: c, ...props }) => (
    <Tooltip onClick={props.onClick} title='Duplicate it!'>
        <CopyIcon className={c.root} />
    </Tooltip>
);

const _CopyAction = withStyles(styles)(CopyAction);

export { _CopyAction as default, _CopyAction as CopyAction };
