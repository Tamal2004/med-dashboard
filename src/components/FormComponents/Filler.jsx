import React from 'react';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core';

const styles = ({ spacing }) => ({
    root: {
        paddingTop: spacing.unitPadding * 4 + spacing.unitHeight
    }
});

const Filler = ({ classes: c }) => <div className={c.root}/>;

const _Filler = withStyles(styles)(Filler);

export { _Filler as default, _Filler as Filler };
