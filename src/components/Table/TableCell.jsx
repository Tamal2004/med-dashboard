import React from 'react';
import { TableCell } from '@material-ui/core';

function _TableCell({ ...props }) {
    return <TableCell {...props}>{props.children}</TableCell>;
}

_TableCell.defaultProps = {
    align: 'right'
};

export { _TableCell as default, _TableCell as TableCell };
