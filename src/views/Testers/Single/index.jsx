import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// Material
import { Card, Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded';

// Local
import {
    GridContainer,
    GridItem,
    NavigateButton,
    Table,
    TooltipIcon
} from 'components';

const useStyles = makeStyles(theme => ({
    gridDistance: {
        marginBottom: 32
    },
    anchorStyle: {
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
    buttonGridStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
    }
}));

const LinkTo = ({ to, children }) => {
    const c = useStyles();
    return (
        <Link className={c.anchorStyle} to={to}>
            {children}
        </Link>
    );
};

const GridWrapper = ({ children }) => {
    const c = useStyles();
    return (
        <GridContainer className={c.gridDistance} alignItems='center'>
            {children}
        </GridContainer>
    );
};

const TesterSingle = ({ match }) => {
    const c = useStyles();
    return (
        <div>
            <GridWrapper>
                <GridItem md={6}>
                    <Card className={c.header}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant='h4'>
                                    Tester Details
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <TooltipIcon title='aast' Icon={EditIcon} />
                            </Grid>
                        </Grid>
                        <h3>Tester: {match.params.id} Details</h3>
                    </Card>
                </GridItem>
                <GridItem md={6}>
                    <GridItem md={12}>Contact Details Card</GridItem>
                    <GridItem md={12}>Employment Details Card</GridItem>
                    <GridItem md={12}>Test Session</GridItem>
                </GridItem>
            </GridWrapper>

            <GridWrapper>
                <GridItem md={12}>Contact notes</GridItem>
            </GridWrapper>
        </div>
    );
};

export { TesterSingle as default, TesterSingle };
