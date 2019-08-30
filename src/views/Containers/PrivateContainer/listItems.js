import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    SvgIcon,
    Divider,
    Link,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core';

import {
    AccountBox as AccountIcon,
    People as TesterIcon,
    NaturePeople as ClientIcon,
    BarChart as ProjectIcon,
    ChevronRight as ListIcon,
    PhoneOutlined as PhoneIcon,
    EmailOutlined as EmailIcon
} from '@material-ui/icons';

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
    },

    contactWrapper: {
        position: 'fixed',
        bottom: 0,
        padding: 10
    },
    textContainer: {
        display: 'flex',
        marginBottom: 10
    },
    text: {
        paddingLeft: theme.spacing()
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

const LinkListMenu = ({ text, icon: Icon }) => {
    const c = useStyles();
    return (
        <ListItem button>
            <ListItemIcon classes={{ root: c.menuListRoot }}>
                <SvgIcon fontSize='small'>{Icon}</SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: c.textStyle }}>
                {text}
            </ListItemText>
        </ListItem>
    );
};

const ContactUs = () => {
    const c = useStyles();
    return (
        <div className={c.contactWrapper}>
            <div className={c.textContainer}>
                <SvgIcon fontSize='small' color='action'>
                    <PhoneIcon />
                </SvgIcon>
                <Typography className={c.text}>
                    <Link href='tel:01249-444-757'>01249-444-757</Link>
                </Typography>
            </div>
            <div className={c.textContainer}>
                <SvgIcon fontSize='small' color='action'>
                    <EmailIcon />
                </SvgIcon>
                <Typography className={c.text}>
                    <Link href='mailto:avril@webusability.co.uk'>
                        avril@webusability.co.uk
                    </Link>
                </Typography>
            </div>
        </div>
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
            <LinkItem to={'/'} title={'Home'}>
                <LinkListMenu text='Home' icon={<ClientIcon />} />
            </LinkItem>
        ) : (
            <Fragment>
                <LinkItem to={'/client'} title={'Clients'}>
                    <LinkListMenu text='Clients' icon={<ClientIcon />} />
                </LinkItem>
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
                {!isTester && (
                    <LinkItem to={'/profile/new-user'} title={'Create user'}>
                        <LinkListItem text='Create user' />
                    </LinkItem>
                )}
                <LinkItem
                    to={'/profile/logout'}
                    onClick={() => this.props.logoutUser()}
                    title={'Logout'}
                >
                    <LinkListItem text='Logout' />
                </LinkItem>
            </MenuItem>
        </Menu>

        {isTester && <ContactUs />}
    </Fragment>
);

const mapState = ({ auth }) => ({ auth });

const _ListItems = connect(mapState)(ListItems);

export { _ListItems as default, _ListItems as ListItems };
