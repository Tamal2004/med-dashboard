import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const withDateProvider = Component => props => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Component {...props} />
    </MuiPickersUtilsProvider>
);

export { withDateProvider as default, withDateProvider };
