import React from 'react';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { Control } from '../Control';
import { SelectBase } from 'components';

const Select = ({ required = false, label, ...restProps }) => (
    <Control label={label} required={required}>
        <SelectBase styles={useStyles()} {...restProps} />
    </Control>
);

Select.defaultProps = {
    placeholder: 'Please select...'
};

Select.propTypes = {
    data: PropTypes.array.isRequired
};

export { Select as default, Select };
