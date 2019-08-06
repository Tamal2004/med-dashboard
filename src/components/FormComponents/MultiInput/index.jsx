import React from 'react';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import { Control } from '../Control';

const MultiInput = ({ required = false, label, ...restProps }) => (
    <Control label={label} required={required}>
        <InputBase
            styles={useStyles()}
            multiline
            rows={8}
            rowsMax={8}
            {...restProps}
        />
    </Control>
);

export { MultiInput as default, MultiInput };
