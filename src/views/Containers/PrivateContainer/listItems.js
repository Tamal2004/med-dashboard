import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SvgIcon, withStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountBox';
import TesterIcon from '@material-ui/icons/People';
import ClientIcon from '@material-ui/icons/NaturePeople';
import ProjectIcon from '@material-ui/icons/BarChart';
import ListIcon from '@material-ui/icons/ChevronRight';

import { Accordion, AccordionPanel } from 'components';

const Style = () => ({
    textStyle: {
        fontSize: 14
    },
    ListRoot: {
        fontSize: 14,
        paddingLeft: 14
    },
    anchorStyle: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

/*********************
 * Private Components *
 **********************/
const _LinkItem = ({ classes, to, title, children }) => (
    <Link className={classes.anchorStyle} to={to} title={title}>
        {children}
    </Link>
);

const _LinkListItem = ({ classes, text }) => (
    <ListItem button>
        <ListItemIcon classes={{ root: classes.ListRoot }}>
            <SvgIcon fontSize='small'>
                <ListIcon />
            </SvgIcon>
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.textStyle }}>
            {text}
        </ListItemText>
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

const LinkItem = withStyles(Style)(_LinkItem);
const LinkListItem = withStyles(Style)(_LinkListItem);

/********************
 * Public Components *
 ********************/
export const mainListItems = (
    <Fragment>
        {/*Client*/}
        <Menu>
            <MenuItem icon={<ClientIcon />} tag='clients-1' title='Clients'>
                <LinkItem to={'/clients'} title={'Clients'}>
                    <LinkListItem text='Clients' />
                </LinkItem>
            </MenuItem>
        </Menu>

        {/*Project*/}
        <Menu>
            <MenuItem icon={<ProjectIcon />} tag='clients-1' title='Projects'>
                <LinkItem to={'/projects'} title={'Projects'}>
                    <LinkListItem text='Projects' />
                </LinkItem>
            </MenuItem>
        </Menu>

        {/*Tester*/}
        <Menu>
            <MenuItem icon={<TesterIcon />} tag='testers-1' title='Testers'>
                <LinkItem to={'/testers'} title={'Testers'}>
                    <LinkListItem text='Testers' />
                </LinkItem>
            </MenuItem>
        </Menu>
    </Fragment>
);

export const secondaryListItems = (
    <Fragment>
        {/*Tester*/}
        <Menu>
            <MenuItem icon={<AccountIcon />} tag='account-1' title='Account'>
                <LinkItem to={'/profile'} title={'Account'}>
                    <LinkListItem text='Account' />
                </LinkItem>
            </MenuItem>
        </Menu>
    </Fragment>
);
