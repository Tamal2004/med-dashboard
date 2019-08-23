import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SvgIcon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountIcon from '@material-ui/icons/AccountBox';
import TesterIcon from '@material-ui/icons/People';
import ClientIcon from '@material-ui/icons/NaturePeople';
import ProjectIcon from '@material-ui/icons/BarChart';
import ListIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';

import { Accordion, AccordionPanel } from 'components';

const useStyles = makeStyles(theme => ({
    textStyle: {
        fontSize: 14
    },
    ListRoot: {
        fontSize: 14,
        paddingLeft: 14
    },
    menuListRoot: {
        minWidth: 'auto',
        paddingRight: 16
    },
    anchorStyle: {
        color: 'inherit',
        textDecoration: 'none'
    },
    activeColor: {
        color: theme.palette.primary.main
    }
}));

/*********************
 * Private Components *
 **********************/
const LinkItem = ({ to, title, children, ...rest }) => {
    const c = useStyles();
    return (
        <NavLink
            exact
            className={c.anchorStyle}
            activeClassName={c.activeColor}
            to={to}
            title={title}
        >
            {children}
        </NavLink>
    );
};

const LinkListItem = ({ text }) => {
    const c = useStyles();
    return (
        <ListItem button>
            <ListItemIcon classes={{ root: c.ListRoot }}>
                <SvgIcon fontSize='small'>
                    <ListIcon />
                </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: c.textStyle }}>
                {text}
            </ListItemText>
        </ListItem>
    );
};

const LinkListMenu = ({ text }) => {
    const c = useStyles();
    return (
        <ListItem button>
            <ListItemIcon classes={{ root: c.menuListRoot }}>
                <SvgIcon fontSize='small'>
                    <ClientIcon />
                </SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: c.textStyle }}>
                {text}
            </ListItemText>
        </ListItem>
    );
};

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

/********************
 * Public Components *
 ********************/
const ListItems = ({ auth: { isTester, name } }) => (
    <Fragment>
        {/*Client and Project and Tester*/}
        {isTester ? (
            <LinkItem to={`/`} title={'Home'}>
                <LinkListMenu text='Home' />
            </LinkItem>
        ) : (
            <Fragment>
                <Menu>
                    <MenuItem
                        icon={<ClientIcon />}
                        tag='clients-1'
                        title='Clients'
                    >
                        <LinkItem to={'/client'} title={'Clients'}>
                            <LinkListItem text='Clients' />
                        </LinkItem>
                        <LinkItem to={'/client/search'} title={'Search Client'}>
                            <LinkListItem text='Search Client' />
                        </LinkItem>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem
                        icon={<ProjectIcon />}
                        tag='clients-1'
                        title='Projects'
                    >
                        <LinkItem to={'/project'} title={'Projects'}>
                            <LinkListItem text='Projects' />
                        </LinkItem>
                        <LinkItem to={'/project/new'} title={'Add New Project'}>
                            <LinkListItem text='Add New Project' />
                        </LinkItem>
                        <LinkItem
                            to={'/project/search'}
                            title={'Search Project'}
                        >
                            <LinkListItem text='Search Project' />
                        </LinkItem>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem
                        icon={<TesterIcon />}
                        tag='testers-1'
                        title='Testers'
                    >
                        <LinkItem to={'/tester'} title={'Testers'}>
                            <LinkListItem text='Testers' />
                        </LinkItem>
                        <LinkItem to={'/tester/new'} title={'Add New Tester'}>
                            <LinkListItem text='Add New Tester' />
                        </LinkItem>
                        <LinkItem to={'/tester/mail'} title={'Mail'}>
                            <LinkListItem text='Mail' />
                        </LinkItem>
                        <LinkItem to={'/tester/search'} title={'Search Tester'}>
                            <LinkListItem text='Search Tester' />
                        </LinkItem>
                    </MenuItem>
                </Menu>
                <Divider />
            </Fragment>
        )}

        {/*Secondary*/}
        <Menu>
            <MenuItem icon={<AccountIcon />} tag='account-1' title='Account'>
                <LinkItem to={'/profile'} title={'Profile'}>
                    <LinkListItem text='Profile' />
                </LinkItem>
                <LinkItem to={'/profile/logout'} title={'Logout'}>
                    <LinkListItem text='Logout' />
                </LinkItem>
            </MenuItem>
        </Menu>
    </Fragment>
);

const mapState = ({ auth }) => ({ auth });

const _ListItems = connect(mapState)(ListItems);

export { _ListItems as default, _ListItems as ListItems };
