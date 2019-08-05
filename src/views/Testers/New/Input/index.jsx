import React from 'react';
import PropTypes from 'prop-types';

// Local
import useStyles from './styles';
import { InputBase } from 'components';
import {Control} from "../Control";

const Input = ({ required = false, label, ...restProps }) => (
    <Control label={label} required={required}>
        <InputBase styles={useStyles()} {...restProps} />
    </Control>
);


export { Input as default, Input };
