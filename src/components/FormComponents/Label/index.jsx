import React from 'react';

// Material
import { withStyles } from '@material-ui/core';

// Local
import styles from './styles';

const Filler = ({ classes: c }) => <div className={c.root} />;

const _Filler = withStyles(styles)(Filler);

export { _Filler as default, _Filler as Filler };
