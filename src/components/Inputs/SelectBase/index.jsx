import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material
import { withStyles, FormControl } from '@material-ui/core';

// Local
import containerStyles from './styles';
import selectStyles from './Select/styles';
import Select from './Select';

/*
 * Domain: --
 * Page: --
 * Component: Select
 * Type:
 * Select
 */
class SelectBase extends Component {
    state = {
        unitHeight: null,
        unitWidth: null,
        iconRight: null
    };

    componentDidMount() {
        const node = node => ReactDOM.findDOMNode(node);
        this.setState({
            unitWidth: node(this.containerRef).offsetWidth,
            unitHeight: node(this.containerRef).offsetHeight,
            iconRight: window
                .getComputedStyle(node(this.iconRef))
                .right.slice(0, -2)
        });
    }

    renderSelect = () => {
        const { state, props } = this;
        const { unitHeight, unitWidth, iconRight } = state;
        const { classes, listMaxNumber = 5, ...selectProps } = props;

        const SelectComponent = withStyles(
            selectStyles({ listMaxNumber, unitHeight, unitWidth, iconRight })
        )(Select);

        return (
            unitHeight && <Field {...selectProps} component={SelectComponent} />
        );
    };

    render() {
        const { state, props, renderSelect } = this;
        const { iconRight, unitHeight } = state;
        const {
            classes: { container, cancellableRoot },
            className,
            styles = {}
        } = props;

        const containerClassName = classNames(
            container,
            styles.control || className
        );

        const iconClassName = classNames(
            cancellableRoot,
            styles.cancellableRoot
        );

        return (
            <Fragment>
                {Boolean(iconRight) || (
                    <div
                        className={iconClassName}
                        ref={ref => (this.iconRef = ref)}
                    />
                )}
                {Boolean(unitHeight) || (
                    <FormControl
                        className={containerClassName}
                        ref={ref => (this.containerRef = ref)}
                    />
                )}

                {renderSelect()}
            </Fragment>
        );
    }
}

SelectBase.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    handleForm: () => {}
};

const _SelectBase = withStyles(containerStyles)(SelectBase);

export { _SelectBase as default, _SelectBase as SelectBase };
