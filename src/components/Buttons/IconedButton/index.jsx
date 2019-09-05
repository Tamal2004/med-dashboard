import React, {Fragment} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Material
import { Button } from '@material-ui/core';

// Local
import useStyles from './styles';
import { validateRequired, composeClasses } from 'libs';

const IconedButton = ({ styles, Icon, children, loading, ...props }) => {
    const c = composeClasses({ classes: useStyles(), styles });
    const color = props.disabled ? 'disabled' : props.color;
    return (
        <Button className={clsx(c.root, loading && c.loading)} {...props}>
            <Icon color={color} className={c.icon} />
            {children}
        </Button>
    );
};

IconedButton.defaultProps = {
    color: 'primary',
    variant: 'outlined',
    children: <Fragment/>,
    loading: false
};

IconedButton.propTypes = {
    Icon: PropTypes.any.isRequired,
    loading: PropTypes.bool
};

export { IconedButton as default, IconedButton };
