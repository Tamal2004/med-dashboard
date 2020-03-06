import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(({ spacing, typography, palette, shadows }) => ({
    root: {
        boxShadow: shadows[4]
    },
    table: {
        minWidth: spacing(80),
        marginTop: spacing(3)
    },
    cellRoot: {
        textTransform: 'uppercase',
        fontSize: '1rem',
        color: palette.common.black,
        fontWeight: 700
    },
    cellDataRoot: {
        width: '28vw'
    },
    idLabel: {
        fontWeight: typography.fontWeightHeavy,
        marginRight: spacing(-15)
    },
    id: {
        textTransform: 'none'
    }
}));

const ReportTable = ({ data, type }) => {
    const c = useStyles();

    const CellPrimary = ({ children }) => (
        <TableCell classes={{ root: c.cellRoot }}>{children}</TableCell>
    );

    const CellData = ({ title, value }) => (
        <TableCell className={c.cellDataRoot}>
            <b>{title}:&nbsp;</b>
            {value}
        </TableCell>
    );

    return data.map((row, index) => (
        <Paper key={`${row.testerId}${index}`} className={c.root}>
            <Table className={c.table}>
                <TableHead>
                    <TableRow>
                        <CellPrimary>
                            <Typography
                                variant='subtitle2'
                                className={c.idLabel}
                            >
                                {`Tester Id: `}
                                <Typography
                                    className={c.id}
                                    variant='caption'
                                >{`${row.testerId}`}</Typography>
                            </Typography>
                        </CellPrimary>
                        <CellPrimary />
                        <CellPrimary />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <CellData title='Date' value={row.date} />
                        <CellData title='Time' value={row.time} />
                        <CellData title='Location' value={row.location} />
                    </TableRow>

                    <TableRow>
                        <CellData title='Profile' value={row.profile} />
                        {type === 'named' ? (
                            <Fragment>
                                <CellData title='Name' value={row.name} />
                                <CellData
                                    title='Phone numbers'
                                    value={row.phoneNumber}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <CellPrimary />
                                <CellPrimary />
                            </Fragment>
                        )}
                    </TableRow>

                    <TableRow>
                        <CellData title='Age' value={row.age} />
                        <CellData title='Sex' value={row.sex} />
                        <CellData title='Ethnicity' value={row.ethnicity} />
                    </TableRow>

                    <TableRow>
                        <CellData title='Job Title' value={row.jobTitle} />
                        <CellData title='Notes' value={row.notes} />
                        <CellPrimary />
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    ));
};

ReportTable.defaultProps = {
    data: [],
    type: 'named'
};

ReportTable.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['named', 'anonymous'])
};

export { ReportTable as default, ReportTable };
