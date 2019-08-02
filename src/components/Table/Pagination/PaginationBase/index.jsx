import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material
import { withStyles, Button, Card, Slide } from '@material-ui/core';

// Local
import styles from './styles';
import PaginationButtonBase from '../PaginationButtonBase';
import { composeClasses } from 'libs';
import { BackwardIcon, ForwardIcon } from 'assets';

class PaginationBase extends Component {
    FIRST_PAGE = 1;
    NAVIGATION_BUTTON_COUNT = 4;
    SLIDE_LEFT = 'left';
    SLIDE_RIGHT = 'right';

    state = {
        activePages: [],
        bufferActivePages: [],
        currentPage: this.FIRST_PAGE,
        slideDirection: this.SLIDE_RIGHT,
        slideIn: true
    };

    componentDidMount() {
        this.setState({
            activePages: this.composeInitialPages()
        });
    }

    componentDidUpdate({ totalPages }, s, c) {
        const { props, handlePageButton } = this;
        if (totalPages !== props.totalPages) handlePageButton(1);
    }

    composeSlideDirection = () => {
        const {
            state: { slideDirection },
            SLIDE_LEFT,
            SLIDE_RIGHT
        } = this;
        return slideDirection === SLIDE_LEFT ? SLIDE_RIGHT : SLIDE_LEFT;
    };

    composeInitialPages = () => {
        const {
            props: { pageStep, totalPages },
            NAVIGATION_BUTTON_COUNT,
            FIRST_PAGE
        } = this;

        const start =
            totalPages > pageStep + NAVIGATION_BUTTON_COUNT
                ? FIRST_PAGE + 1
                : FIRST_PAGE;
        const stop =
            totalPages <= pageStep + NAVIGATION_BUTTON_COUNT
                ? totalPages
                : pageStep + 1;
        return Array.range(start, stop);
    };

    composeFinalPages = () => {
        const { pageStep, totalPages } = this.props;
        return Array.range(totalPages - pageStep, totalPages - 1);
    };

    handlePageButton = pageNumber => {
        const {
            state: { activePages: prevActivePages },
            props: { handlePage, pageStep, totalPages },
            SLIDE_LEFT,
            SLIDE_RIGHT,
            NAVIGATION_BUTTON_COUNT,
            composeInitialPages,
            composeFinalPages
        } = this;

        const slideState = {};

        let activePages = [];
        const pageStepBoundary = Math.floor(pageStep / 2);
        const centralPage = prevActivePages[pageStepBoundary];

        if (
            totalPages <= pageStep + NAVIGATION_BUTTON_COUNT ||
            pageNumber <= pageStep
        )
            activePages = composeInitialPages();
        else if (pageNumber > totalPages - pageStep)
            activePages = composeFinalPages();
        else {
            activePages = Array.range(
                pageNumber - pageStepBoundary,
                pageNumber + pageStepBoundary
            );
        }

        slideState.slideDirection =
            centralPage < pageNumber ? SLIDE_RIGHT : SLIDE_LEFT;

        if (
            centralPage !== activePages[pageStepBoundary] &&
            Math.abs(centralPage - pageNumber) > pageStepBoundary
        ) {
            slideState.slideIn = false;
            slideState.bufferActivePages = activePages;
        } else {
            slideState.activePages = activePages;
        }

        handlePage(pageNumber);
        this.setState({
            currentPage: pageNumber,
            ...slideState
        });
    };

    handleForwardButton = () => {
        const {
            state: { activePages: prevActivePages },
            props: { pageStep, totalPages },
            composeFinalPages,
            handleSlideTransition
        } = this;

        let activePages = [];

        if (
            prevActivePages[prevActivePages.length - 1] >
            totalPages - pageStep - 1
        )
            activePages = composeFinalPages();
        else activePages = prevActivePages.map(page => page + pageStep);

        handleSlideTransition(activePages, false);
    };

    handleBackwardsButton = () => {
        const {
            state: { activePages: prevActivePages },
            props: { pageStep },
            composeInitialPages,
            handleSlideTransition
        } = this;

        let activePages = [];

        if (prevActivePages[0] <= pageStep + 1)
            activePages = composeInitialPages();
        else activePages = prevActivePages.map(page => page - pageStep);

        handleSlideTransition(activePages, true);
    };

    handleSlideTransition = (bufferActivePages = null, slideLeft) => {
        const {
            state: { slideIn },
            SLIDE_LEFT,
            SLIDE_RIGHT
        } = this;

        this.setState({
            slideIn: !slideIn,
            slideDirection: slideLeft ? SLIDE_LEFT : SLIDE_RIGHT,
            ...(bufferActivePages ? { bufferActivePages } : {})
        });
    };

    renderButton = (pageNumber, isLast) => {
        const {
            state: { currentPage },
            props: { PageButton },
            handlePageButton
        } = this;

        const buttonProps = {
            onClick: () => handlePageButton(pageNumber),
            active: currentPage === pageNumber,
            edge: isLast && 'end'
        };

        const Button = PageButton || PaginationButtonBase;
        return <Button {...buttonProps}>{pageNumber}</Button>;
    };

    renderActivePageButtons = () => {
        const {
            state: { activePages, slideIn, slideDirection, bufferActivePages },
            props: { transitionSpeed },
            composeSlideDirection,
            renderButton
        } = this;

        return activePages.map((pageNumber, index, pagesArray) => (
            <Slide
                key={pageNumber}
                direction={slideDirection}
                in={slideIn}
                timeout={transitionSpeed}
                onExited={() => {
                    if (index === pagesArray.length - 1)
                        this.setState({
                            slideIn: true,
                            slideDirection: composeSlideDirection(),
                            activePages: bufferActivePages,
                            bufferActivePages: []
                        });
                }}
            >
                {renderButton(pageNumber, index === pagesArray.length - 1)}
            </Slide>
        ));
    };

    render() {
        const {
            state: { activePages },
            props: { classes, styles, className, pageStep, totalPages },
            NAVIGATION_BUTTON_COUNT,
            FIRST_PAGE,
            renderButton,
            renderActivePageButtons,
            handleBackwardsButton,
            handleForwardButton
        } = this;

        const c = composeClasses({ classes, styles });
        const shouldRenderNavigation =
            totalPages > pageStep + NAVIGATION_BUTTON_COUNT;

        return (
            <Card className={clsx(c.root, className)}>
                {shouldRenderNavigation && renderButton(FIRST_PAGE)}
                {shouldRenderNavigation && (
                    <PaginationButtonBase
                        disabled={activePages[0] === FIRST_PAGE + 1}
                        onClick={handleBackwardsButton}
                        edge='end'
                    >
                        <BackwardIcon />
                    </PaginationButtonBase>
                )}
                <Card className={c.root}>{renderActivePageButtons()}</Card>
                {shouldRenderNavigation && (
                    <PaginationButtonBase
                        variant='contained'
                        color='secondary'
                        disabled={
                            activePages[activePages.length - 1] ===
                            totalPages - 1
                        }
                        onClick={handleForwardButton}
                    >
                        <ForwardIcon />
                    </PaginationButtonBase>
                )}
                {shouldRenderNavigation && renderButton(totalPages, true)}
            </Card>
        );
    }
}

PaginationBase.defaultProps = {
    pageStep: 5,
    transitionSpeed: 250
};

PaginationBase.propTypes = {
    classes: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    handlePage: PropTypes.func.isRequired,
    styles: PropTypes.object,
    PageButton: PropTypes.any,
    transitionSpeed: PropTypes.number,
    pageStep: (props, propName, componentName) => {
        const pageStep = props[propName];
        if (typeof pageStep !== 'number') {
            return Error(
                `Invalid prop type '${propName}' supplied to ${componentName}. Expected a number.`
            );
        } else if (pageStep % 2 === 0) {
            return Error(
                `Invalid prop value of ${pageStep} supplied as '${propName}' to ${componentName}. Expected an odd number.`
            );
        }
    }
};

const _PaginationBase = withStyles(styles)(PaginationBase);

export { _PaginationBase as default, _PaginationBase as PaginationBase };
