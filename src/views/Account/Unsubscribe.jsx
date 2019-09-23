import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qString from 'query-string';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { GridContainer, GridItem, NavigateButton } from 'components';

//Local
import { unsubscribe } from 'actions';
import history from 'libs/history';

const useStyles = makeStyles(theme => ({
    button: {
        minWidth: 150,
        [theme.breakpoints.down('sm')]: {
            minWidth: 100,
			width: '100%'
        }
    },
    buttonContainer: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10,
			width: '100%'
        }
    },
    gridWrapper: {
        minHeight: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        border: '2px solid #d2d2d2',
        margin: 40
    },
    buttonWrapper: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-around',
        alignContent: 'space-between',
        marginTop: 30,
        borderTop: '2px solid #eaeaea',
        paddingTop: 30,
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
			alignItems: 'center'
        }
    },
    typography: {
        fontWeight: 700
    }
}));


const UnsubscribeUser = ({ unsubscribe, gotoSignIn }) => {
    const c = useStyles();
    const values = qString.parse(history.location.search);

    return (
        <GridContainer alignItems='center'>
            <GridItem md={6} xs={8} className={c.gridWrapper}>
                <Typography className={c.typography} variant='h5' gutterBottom>
                    Do you really want to unsubscribe?
                </Typography>
                <div className={c.buttonWrapper}>
                    <NavigateButton
                        styles={{
                            root: c.button,
                            container: c.buttonContainer
                        }}
						color='secondary'
                        onClick={async () => await unsubscribe(values.id)}
						enableLoader
                    >
                        Yes
                    </NavigateButton>
                    <NavigateButton
						styles={{
							root: c.button,
							container: c.buttonContainer
						}}
						color='secondary'
                        onClick={() => {
                            history.replace('/');
                            gotoSignIn();
                        }}
                    >
                        No
                    </NavigateButton>
                </div>
            </GridItem>
        </GridContainer>
    );
};

const mapDispatch = {
    unsubscribe
};

const _UnsubscribeUser = compose(
    connect(
        null,
        mapDispatch
    )
)(UnsubscribeUser);

export { _UnsubscribeUser as default, _UnsubscribeUser as UnsubscribeUser };
