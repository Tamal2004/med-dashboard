import React, { Fragment } from 'react';
import classNames from 'classnames';

// Material
import { withStyles, FormLabel } from '@material-ui/core';

// Local
import styles from './styles';

const LabelBase = ({ classes: c, className, label, ...restProps }) => (
    <Fragment>
        <FormLabel
            classes={{
                root: classNames(c.root, className),
                ...Object.splice(c, ['focused', 'disabled'])
            }}
            {...restProps}
        >
            {label}
        </FormLabel>
    </Fragment>
);

const _LabelBase = withStyles(styles)(LabelBase);

export { _LabelBase as default, _LabelBase as LabelBase };
