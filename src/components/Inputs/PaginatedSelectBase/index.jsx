import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Material
import {
    withStyles,
    Button,
    Card,
    ClickAwayListener,
    Popper
} from '@material-ui/core';

// Local
import styles from './styles';
import PaginatedSelectContainer from './PaginatedSelectContainer';
import { composeClasses } from 'helpers';

const popperModifiers = {
    flip: { enabled: false },
    computeStyle: { gpuAcceleration: false }
};

const generateData = (reference, cost, Supplier, dev) => ({
    'Reference': reference,
    'Trim Cost': cost,
    Supplier,
    'Trim Development For': dev
});

const trimData = [
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-734', '24.00', 'Frieza', 'Great Look Retailers'),
    generateData('ETCBR-246', '6.00', 'Penny', 'Good Look Retailers'),
    generateData('ETCBR-836', '244.00', 'Sheldor', 'Luxury Look Retailers'),
    generateData('ETCBR-214', '25.00', 'Azeroth', 'Rich Look Retailers'),
    generateData('ETCBR-787', '2.00', 'Gater', 'Poor Look Retailers'),
    generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers'),
    generateData('ETCBR-214', '6.00', 'Derek', 'Funny Look Retailers'),
    generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers'),
    generateData('ETCBR-214', '6.00', 'Derek', 'Funny Look Retailers')
];
class PaginatedSelectBase extends Component {
    state = {
        anchorElement: null
    };

    handlePopper = ({ currentTarget }) =>
        this.setState({
            anchorElement: this.state.anchorElement ? null : currentTarget
        });

    handlePopperClose = () => {
        this.setState({ anchorElement: null });
    };

    composePlacement = () => {
        switch (this.props.justify) {
            case 'left':
                return 'bottom-start';
            case 'center':
                return 'bottom';
            case 'right':
                return 'bottom-end';
        }
    };

    render() {
        const {
            state: { anchorElement },
            props: { classes, styles, data },
            composePlacement,
            handlePopper,
            handlePopperClose
        } = this;

        const c = composeClasses({ classes, styles });

        return (
            <Fragment>
                <Button
                    variant='contained'
                    className={c.root}
                    onClick={handlePopper}
                >
                    Open Paginated Select
                </Button>
                <Popper
                    open={!!anchorElement}
                    anchorEl={anchorElement}
                    placement={composePlacement()}
                    modifiers={popperModifiers}
                >
                    <ClickAwayListener
                        mouseEvent='onMouseDown'
                        onClickAway={handlePopperClose}
                    >
                        <PaginatedSelectContainer data={data} />
                    </ClickAwayListener>
                </Popper>
            </Fragment>
        );
    }
}

PaginatedSelectBase.defaultProps = {
    justify: 'left',
    data: [
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
        trimData,
    ].flatMap(x => x)
};

PaginatedSelectBase.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    styles: PropTypes.object,
    justify: PropTypes.oneOf(['left', 'center', 'right'])
};

const _PaginatedSelectBase = withStyles(styles)(PaginatedSelectBase);

export {
    _PaginatedSelectBase as default,
    _PaginatedSelectBase as PaginatedSelectBase
};
