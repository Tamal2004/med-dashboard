import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Auth } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
// Material
import {
    Button,
    Typography,
    Card,
    Input,
    FormLabel,
    Grid
} from '@material-ui/core';

// Local
import useStyles from './styles';
import { Table } from '../../components/Table/';
import { sendMail } from '../../services/mailer';
import { createBlog } from "../../graphql/mutations";


async function createNewBlog() {
    const blog = { name: 'Using first check'};
    return await API.graphql(graphqlOperation(createBlog, { input: blog }));
}

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
    Supplier: {
        Component: (
            <Button
                color='primary'
                variant='contained'
                onClick={() => createNewBlog().then(res => console.log(res))}
            >
                {Supplier}
            </Button>
        ),
        value: Supplier
    },
    'Trim Development For': {
        Component: (
            <Button
                color='primary'
                variant='contained'
                onClick={
                    /*() => sendMail().then(res => console.log(res))*/ () =>
                        Auth.signIn({
                            username: 'matthew.tamal@gmail.com',
                            password: 'Password123'
                        }).then(res => console.log('sign in', res))
                }
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
            {/*<Card className={c.form}>
                <Grid container >
                    <Grid item xs={6}className={c.controlLabel}>
                        <FormLabel className={c.label}>Label: </FormLabel>
                    </Grid>
                    <Grid item xs={6}className={c.controlInput}>
                        <Input fullWidth className={c.input} />
                    </Grid>
                </Grid>
            </Card>*/}
        </div>
    );
};

export { ClientsLanding as default, ClientsLanding };
