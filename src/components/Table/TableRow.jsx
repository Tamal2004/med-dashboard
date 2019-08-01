import React from 'react';
import { TableRow } from '@material-ui/core';

function _TableRow({ ...props }) {
	return <TableRow {...props}>{props.children}</TableRow>;
}

export { _TableRow as default, _TableRow as TableRow };
