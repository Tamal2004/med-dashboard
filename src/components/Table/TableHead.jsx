import React from 'react';

import { TableHead, TableRow } from '@material-ui/core';

function _TableHead({ ...props }) {
	return (
		<TableHead {...props}>
			<TableRow>{props.children}</TableRow>
		</TableHead>
	);
}

export { _TableHead as default, _TableHead as TableHead };
