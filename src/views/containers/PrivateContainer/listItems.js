import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountIcon from '@material-ui/icons/AccountBox';
import TesterIcon from '@material-ui/icons/People';
import ClientIcon from '@material-ui/icons/NaturePeople';
import ProjectIcon from '@material-ui/icons/BarChart';

const anchorStyle = {
    color: 'inherit',
    textDecoration: 'none'
};

const LinkItem = ({ to, title, children }) => (
    <Link style={anchorStyle} to={to} title={title}>
        {children}
    </Link>
);

export const mainListItems = (
    <Fragment>
        <LinkItem to={'/clients'} title={'Clients'}>
            <ListItem button>
                <ListItemIcon>
                    <ClientIcon />
                </ListItemIcon>
                <ListItemText primary='Clients' />
            </ListItem>
        </LinkItem>
        <LinkItem to={'/projects'} title={'Projects'}>
            <ListItem button>
                <ListItemIcon>
                    <ProjectIcon />
                </ListItemIcon>
                <ListItemText primary='Projects' />
            </ListItem>
        </LinkItem>
        <LinkItem to={'/testers'} title={'Testers'}>
            <ListItem button>
                <ListItemIcon>
                    <TesterIcon />
                </ListItemIcon>
                <ListItemText primary='Testers' />
            </ListItem>
        </LinkItem>
    </Fragment>
);

export const secondaryListItems = (
    <Fragment>
        <LinkItem to={'/profile'} title={'Account'}>
            <ListItem button>
                <ListItemIcon>
                    <AccountIcon />
                </ListItemIcon>
                <ListItemText primary='Account' />
            </ListItem>
        </LinkItem>
    </Fragment>
);
