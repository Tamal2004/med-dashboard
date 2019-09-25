import React from 'react';
import { connect } from 'react-redux';

// Material
import { makeStyles, Typography } from '@material-ui/core';

// Components
import { NavigateButton } from 'components';

// Libs
import { history } from 'libs';

// Selectors
import {
    selectInSearchMode,
    selectCanMoveForwardTester,
    selectCanMoveBackwardTester
} from 'selectors';

// Actions
import { moveBackwardTester, moveForwardTester } from 'actions';

const useStyles = makeStyles(({ spacing, typography }) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        fontWeight: typography.fontWeightBold,
        marginRight: spacing(2),
        marginLeft: spacing(2)
    },
    buttonContainer: {
        marginRight: spacing(2)
    },
    button: {
        minWidth: spacing(30)
    }
}));

const TesterSearchNavigateButtons = ({
    testerId,
    isSearch,
    canMoveBackward,
    canMoveForward,
    moveBackwardTester,
    moveForwardTester
}) => {
    const c = useStyles();
    const buttonStyles = { container: c.buttonContainer, root: c.button };

    return (
        isSearch && (
            <div className={c.container}>
                <Typography className={c.title} variant='subtitle2'>
                    IN SEARCH MODE
                </Typography>
                <NavigateButton
                    color='primary'
                    styles={buttonStyles}
                    onClick={() => moveBackwardTester(testerId)}
                    disabled={!canMoveBackward}
                >
                    Previous Tester
                </NavigateButton>
                <NavigateButton
                    color='secondary'
                    styles={buttonStyles}
                    onClick={() => moveForwardTester(testerId)}
                    disabled={!canMoveForward}
                >
                    Next Tester
                </NavigateButton>
            </div>
        )
    );
};

const mapState = state => {
    // eslint-disable-next-line
    const [_, path, testerId] = history.location.pathname.split('/');

    const isSearchLocation =
        path === 'tester' &&
        new URLSearchParams(history.location.search).get('search') === 'true';

    return {
        testerId: isSearchLocation ? testerId : null,
        isSearch: isSearchLocation && selectInSearchMode(state, testerId),
        canMoveForward:
            isSearchLocation && selectCanMoveForwardTester(state, testerId),
        canMoveBackward:
            isSearchLocation && selectCanMoveBackwardTester(state, testerId)
    };
};
const mapDispatch = { moveBackwardTester, moveForwardTester };

export default connect(
    mapState,
    mapDispatch
)(TesterSearchNavigateButtons);
