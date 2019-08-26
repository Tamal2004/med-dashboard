import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import print from './print.css';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto'
    },
    table: {
        minWidth: 650,
        marginTop: theme.spacing(3)
    },
    cellRoot: {
        textTransform: 'uppercase',
        fontSize: '1rem',
        color: theme.palette.common.black,
        fontWeight: 700
    },
    textAlign: {
        textAlign: 'right'
    },
    sectionToPrint: {
        padding: 20
    }
}));

const ReportTable = ({ data, type }) => {
    const c = useStyles();

    const CellPrimary = ({ children }) => (
        <TableCell classes={{ root: c.cellRoot }}>{children}</TableCell>
    );

    const CellData = ({ title, value }) => (
        <TableCell>
            <b>{title}:&nbsp;</b>
            {value}
        </TableCell>
    );

    return (
        <Fragment>
            <div className={c.textAlign}>
                <IconButton title='Print' onClick={() => window.print()}>
                    <PrintIcon />
                </IconButton>
            </div>
            <div className={clsx(c.sectionToPrint, 'section-to-print')}>
                <Typography variant='h6' align='center'>
                    Web Usability tester profiles for [session reference],
                    [session name]
                </Typography>
                {data.map((row, idx) => (
                    <Paper key={row.title + idx}>
                        <Table className={c.table}>
                            <TableHead>
                                <TableRow>
                                    <CellPrimary>
                                        {row.title} {idx + 1}
                                    </CellPrimary>
                                    <CellPrimary />
                                    <CellPrimary />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <CellData title='Date' value={row.date} />
                                    <CellData title='Time' value={row.time} />
                                    <CellData
                                        title='Location'
                                        value={row.location}
                                    />
                                </TableRow>

                                <TableRow>
                                    <CellData
                                        title='Profile'
                                        value={row.profile}
                                    />
                                    {type === 'named' ? (
                                        <Fragment>
                                            <CellData
                                                title='Name'
                                                value={row.name}
                                            />
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
                                    <CellData
                                        title='Ethnicity'
                                        value={row.ethnicity}
                                    />
                                </TableRow>

                                <TableRow>
                                    <CellData
                                        title='Job Title'
                                        value={row.jobTitle}
                                    />
                                    <CellData title='Notes' value={row.notes} />
                                    <CellPrimary />
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                ))}
            </div>
        </Fragment>
    );
};

const rows = [
    {
        title: 'Tester',
        date: '12/12/1212',
        time: '12:30PM',
        location: 'Marse',
        profile: 'Hello',
        name: 'Jhon Doe',
        phoneNumber: '123-455',
        age: 20,
        sex: 'Male',
        ethnicity: 'Marsian',
        jobTitle: 'Astronaut',
        notes: 'beware of dusts'
    },
    {
        title: 'Tester',
        date: '11/11/1111',
        time: '00:30AM',
        location: 'Bay of Bengal',
        profile: 'World',
        name: 'Jane Doe',
        phoneNumber: '234-466',
        age: 22,
        sex: 'Female',
        ethnicity: 'Mermaid',
        jobTitle: 'Surfing',
        notes: "don't throw plastics in the ocean"
    }
];

ReportTable.defaultProps = {
    data: rows,
    type: 'named'
};

ReportTable.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.oneOf(['named', 'anonymous'])
};

export { ReportTable as default, ReportTable };
