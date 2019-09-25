import React from 'react';
import { connect } from 'react-redux';

// Material
import { makeStyles, Typography } from '@material-ui/core';

// Components
import { Link, NavigateButton } from 'components';

// Libs
import { history } from 'libs';

// Selectors
import {
    selectInSearchMode,
    selectCanMoveForwardTester,
    selectCanMoveBackwardTester
} from 'selectors';

// Actions
import { moveForwardTester } from 'actions';

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
                    onClick={() => console.log('arstr')}
                    disabled={!canMoveBackward}
                >
                    Previous Tester
                </NavigateButton>
                <Link to={'/tester/204649f2-a075-48c0-bdce-ec13065292cd?search=true'}>
                    <NavigateButton
                        color='secondary'
                        styles={buttonStyles}
                        onClick={() => moveForwardTester(testerId)}
                        disabled={!canMoveForward}
                    >
                        Next Tester
                    </NavigateButton>
                </Link>
            </div>
        )
    );
};

const mapState = state => {
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
const mapDispatch = { moveForwardTester };

export default connect(
    mapState,
    mapDispatch
)(TesterSearchNavigateButtons);
