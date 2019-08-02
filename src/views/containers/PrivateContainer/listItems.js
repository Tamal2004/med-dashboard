import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountIcon from '@material-ui/icons/AccountBox';
import TesterIcon from '@material-ui/icons/People';
import ClientIcon from '@material-ui/icons/NaturePeople';
import ProjectIcon from '@material-ui/icons/BarChart';

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <ClientIcon />
            </ListItemIcon>
            <ListItemText primary='Clients' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ProjectIcon />
            </ListItemIcon>
            <ListItemText primary='Projects' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <TesterIcon />
            </ListItemIcon>
            <ListItemText primary='Testers' />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <AccountIcon />
            </ListItemIcon>
            <ListItemText primary='Account' />
        </ListItem>
    </div>
);
