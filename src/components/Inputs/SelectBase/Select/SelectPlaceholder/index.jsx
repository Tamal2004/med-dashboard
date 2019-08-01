import React from 'react';
import { withStyles, FormLabel } from '@material-ui/core';

import styles from './styles';
import { composeClasses } from 'helpers';

/*
 * Domain: --
 * Page: Select
 * Component: Placeholder
 * Type: --
 * SelectPlaceholder
 */
const SelectPlaceholder = ({ classes, styles, placeholder, ...restProps }) => {
    return (
        <FormLabel
            classes={composeClasses(
                { classes, styles },
                { placeholder: 'root' }
            )}
            {...restProps}
        >
            {placeholder}
        </FormLabel>
    );
};

const _SelectPlaceholder = withStyles(styles)(SelectPlaceholder);

export {
    _SelectPlaceholder as default,
    _SelectPlaceholder as SelectPlaceholder
};
