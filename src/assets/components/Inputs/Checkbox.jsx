import React from 'react';

// Local
import CheckboxFilledIcon from './CheckboxFilledIcon';
import CheckboxBlankIcon from './CheckboxBlankIcon';

const Checkbox = ({ checked = false }) =>
    checked ? <CheckboxFilledIcon /> : <CheckboxBlankIcon />;

export { Checkbox as default, Checkbox };
