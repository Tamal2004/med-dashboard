import React, { Fragment, useState } from 'react';

// Material
import { Typography, Divider, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddBox';

// Local
import useStyles from './styles';
import { validateRequired } from 'libs';
import { EditableCard } from '../EditableCard';
import { IconedButton } from '../IconedButton';
import {
    GridContainer,
    GridItem,
    Table,
    Select,
    Input,
    MultiInput,
    Switch,
    PaginationBase
} from 'components';
import { Link } from 'react-router-dom';

const LinkTo = ({ to, children }) => {
    const c = useStyles();
    return (
        <Link className={c.anchorStyle} to={to}>
            {children}
        </Link>
    );
};

const generateData = (reference, cost, Supplier, dev) => ({
    'Tester name': {
        Component: <LinkTo to={'/tester/' + reference}>{reference}</LinkTo>,
        value: reference
    },
    'Tester number': 1014,
    'Last project': {
        Component: <LinkTo to={'/project/' + Supplier}>{Supplier}</LinkTo>,
        value: reference
    },
    'Last testing date': '02/06/2019',
    'Last contact date': '02/06/2019'
});

const trimData = [
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-644', '2.00', 'Gavin', 'Old Look Retailers'),
    generateData('ETCBR-666', '4.00', 'Matt', 'New Look Retailers'),
    generateData('ETCBR-675', '7.00', 'Alex', 'Decent Look Retailers'),
    generateData('ETCBR-734', '24.00', 'Frieza', 'Great Look Retailers'),
    generateData('ETCBR-246', '6.00', 'Penny', 'Good Look Retailers'),
    generateData('ETCBR-836', '244.00', 'Sheldor', 'Luxury Look Retailers'),
    generateData('ETCBR-214', '25.00', 'Azeroth', 'Rich Look Retailers'),
    generateData('ETCBR-787', '2.00', 'Gater', 'Poor Look Retailers'),
    generateData('ETCBR-883', '4.00', 'Simon', 'Ugly Look Retailers')
];

const TestSessions = ({}) => {
    const [page, setPage] = useState(1);
    const c = useStyles();

    const totalPages =
        Math.floor(trimData.length / 10) +
            !!(trimData.length % 10) || 1;
    return (
        <EditableCard title='Test Sessions'>
            <Table data={trimData} action page={page} />
            <div className={c.footer}>
                <IconedButton Icon={AddIcon} color='secondary'>
                    Add a new test session
                </IconedButton>
                <PaginationBase
                    handlePage={page => setPage(page)}
                    totalPages={totalPages}
                />
            </div>
        </EditableCard>
    );
};

export { TestSessions as default, TestSessions };
