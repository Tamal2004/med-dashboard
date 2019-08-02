import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material
import { Button, Typography } from '@material-ui/core';

// Local
import useStyles from './styles';
import { Table } from '../../components/Table/';

const generateData = (reference, cost, Supplier, dev) => ({
    Reference: reference,
    'Trim Cost': {
        Component: (
            <Typography
                style={{ color: 'blue' }}
                onClick={() => console.log('pushing')}
            >
                {cost}
            </Typography>
        ),
        value: cost
    },
    Supplier,
    'Trim Development For': {
        Component: (
            <Button
                color='primary'
                variant='contained'
                onClick={() => console.log('yolo')}
            >
                {dev}
            </Button>
        ),
        value: dev
    }
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

const ClientsLanding = props => {
    const c = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={c.root}>
            <Table data={trimData} page={1} />
        </div>
    );
};

export { ClientsLanding as default, ClientsLanding };
