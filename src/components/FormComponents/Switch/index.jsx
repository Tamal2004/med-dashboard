import React from 'react';


// Local
import useStyles from './styles';
import { SwitchBase } from 'components';
import {Control} from "../Control";

const Switch = ({ required = false, label, ...restProps }) => (
    <Control label={label} required={required}>
        <SwitchBase color='primary' styles={useStyles()} {...restProps} />
    </Control>
);


export { Switch as default, Switch };
