import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ChevronRight from '../../../../node_modules/@material-ui/icons/ChevronRight';
import ChevronLeft from '../../../../node_modules/@material-ui/icons/ChevronLeft';
import styles from './styles';

const ModalChevron = ({ classes: { chevron }, style, onClick, right }) => {
    const Component = right ? ChevronRight : ChevronLeft;
    const finalStyle = {
        [right ? 'right' : 'left']: '-12%',
        ...style,
    };

    return (
        <Component onClick={onClick} style={finalStyle} className={chevron} />
    );
};

ModalChevron.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    right: PropTypes.bool,
    style: PropTypes.object,
};

ModalChevron.defaultProps = {
    right: false,
};

export default withStyles(styles)(ModalChevron);
