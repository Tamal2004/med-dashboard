import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountIcon from '@material-ui/icons/AccountBox';
import TesterIcon from '@material-ui/icons/People';
import ClientIcon from '@material-ui/icons/NaturePeople';
import ProjectIcon from '@material-ui/icons/BarChart';

import { Accordion, AccordionPanel } from 'components';

const anchorStyle = {
    color: 'inherit',
    textDecoration: 'none'
};

const LinkItem = ({ to, title, children }) => (
    <Link style={anchorStyle} to={to} title={title}>
        {children}
    </Link>
);

const LinkListItem = ({ icon, text }) => (
    <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

const Menu = ({ children, ...restProps }) => {
    return <Accordion {...restProps}>{children}</Accordion>;
};

const MenuItem = ({ children, ...restProps }) => {
    return (
        <AccordionPanel reverse={true} {...restProps}>
            {children}
        </AccordionPanel>
    );
};

export const mainListItems = (
    <Fragment>
        <Menu>
            <MenuItem icon={<ClientIcon />} tag='clients-1' title='Clients'>
                <LinkItem to={'/clients'} title={'Clients'}>
                    <LinkListItem icon={<ClientIcon />} text='Clients' />
                </LinkItem>
            </MenuItem>
        </Menu>

        <LinkItem to={'/projects'} title={'Projects'}>
            <LinkListItem icon={<ProjectIcon />} text='Projects' />
        </LinkItem>

        <LinkItem to={'/testers'} title={'Testers'}>
            <LinkListItem icon={<TesterIcon />} text='Testers' />
        </LinkItem>
    </Fragment>
);

export const secondaryListItems = (
    <Fragment>
        <LinkItem to={'/profile'} title={'Account'}>
            <LinkListItem icon={<AccountIcon />} text='Account' />
        </LinkItem>
    </Fragment>
);
