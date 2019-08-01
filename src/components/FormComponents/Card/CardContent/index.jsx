import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { CardContentBase } from 'components';
import styles from './styles';

const CardContent = ({ classes, amended, ...props }) => {
    return <CardContentBase styles={amended ? classes : {}} {...props} />;
};

const _CardContent = withStyles(styles)(CardContent);

export { _CardContent as default, _CardContent as CardContent };
