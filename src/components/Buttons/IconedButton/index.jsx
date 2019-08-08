import React from 'react';
import PropTypes from 'prop-types';

// Material
import { Button } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';

const IconedButton = ({ Icon, children, ...props }) => {
    const c = useStyles();
    return (
        <Button className={c.root} {...props}>
            <Icon color={props.color} className={c.icon} />
            {children}
        </Button>
    );
};

IconedButton.defaultProps = {
    color: 'primary',
    variant: 'outlined'
};

IconedButton.propTypes = {
    Icon: PropTypes.any.isRequired
};

export { IconedButton as default, IconedButton };
