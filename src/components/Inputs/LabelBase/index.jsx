import React, { Fragment } from 'react';
import classNames from 'classnames';

// Material
import { withStyles, FormLabel } from '@material-ui/core';

// Local
import styles from './styles';
import { CheckIcon } from 'assets';
import { Icon } from 'components';

const LabelBase = ({ classes: c, className, label, success, ...restProps }) => (
    <Fragment>
        <FormLabel
            classes={{
                root: classNames(c.root, className),
                ...Object.splice(c, ['focused', 'disabled'])
            }}
            {...restProps}
        >
            {label}
            {success && <CheckIcon className={c.icon} />}
        </FormLabel>
    </Fragment>
);

const _LabelBase = withStyles(styles)(LabelBase);

export { _LabelBase as default, _LabelBase as LabelBase };
