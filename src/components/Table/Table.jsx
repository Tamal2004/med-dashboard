import React from 'react';
import Table from '@material-ui/core/Table';

function _Table({ ...props }) {
    const { children } = props;
    return <Table {...props}>{children}</Table>;
}

export { _Table as default, _Table as Table };
