import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

function DateUtilsWrapper({ ...props }) {
    const { children } = props;
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {children}
        </MuiPickersUtilsProvider>
    );
}

export { DateUtilsWrapper as default, DateUtilsWrapper }
