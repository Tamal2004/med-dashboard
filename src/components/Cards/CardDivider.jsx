import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import { Divider, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(({ spacing }) => ({
    root: {
        margin: spacing(),
        marginLeft: spacing(2),
        marginRight: spacing(2)
    }
}));
const CardDivider = () => {
    const c = useStyles();
    return <Divider className={c.root} />;
};
export { CardDivider as default, CardDivider };
