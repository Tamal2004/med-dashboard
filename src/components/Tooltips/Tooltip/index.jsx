import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

// Material
import { withStyles } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip } from '@material-ui/core';

// Local
import styles from './styles';

class Tooltip extends Component {
    state = {
        arrowRef: null
    };

    handleArrowRef = arrowRef => this.setState({ arrowRef });

    renderTitle = () => {
        const {
            classes: { arrow },
            title = null
        } = this.props;

        return (
            <Fragment>
                {title}
                <span className={arrow} ref={this.handleArrowRef} />
            </Fragment>
        );
    };

    render() {
        const { arrowRef } = this.state;
        const {
            classes: { popperLight, tooltipLight, popperDark, tooltipDark },
            children,
            dark,
            onClick = () => {},
            ...restProps
        } = this.props;

        const popper = dark ? popperDark : popperLight;
        const tooltip = dark
            ? classNames(tooltipLight, tooltipDark)
            : tooltipLight;

        const popperOptions = {
            modifiers: {
                arrow: { enabled: Boolean(arrowRef), element: arrowRef }
            }
        };

        return (
            <MuiTooltip
                title={this.renderTitle()}
                onClick={onClick}
                classes={{ popper, tooltip }}
                PopperProps={{ popperOptions }}
                {...restProps}
            >
                {children}
            </MuiTooltip>
        );
    }
}

Tooltip.defaultProps = {
    title: '',
    placement: 'bottom'
};

Tooltip.propTypes = {
    title: propTypes.oneOfType([propTypes.string, propTypes.number])
};

const ComposedTooltip = withStyles(styles)(Tooltip);

export { ComposedTooltip as default, ComposedTooltip as Tooltip };
