import React from 'react';
import { TableBody } from '@material-ui/core';

function _TableBody({ ...props }) {
	return <TableBody {...props}>{props.children}</TableBody>;
}

export { _TableBody as default, _TableBody as TableBody };
