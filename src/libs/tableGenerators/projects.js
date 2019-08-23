import React from 'react';

import { Link } from 'components';

export const generateProjectList = projectList =>
    projectList.map(
        ({
            id,
            clientId,
            clientName,
            reference,
            title,
            testingDate,
            status,
            manager
        }) => ({
            Client: {
                Component: <Link to={`/client/${clientId}`}>{clientName}</Link>,
                value: clientName
            },
            'Project Ref': {
                Component: <Link to={`/project/${id}`}>{reference}</Link>,
                value: reference
            },
            'Project Title': {
                Component: <Link to={`/project/${id}`}>{title}</Link>,
                value: title
            },
            'Testing Date': testingDate,
            'Project Status': status,
            'Project Manager': manager
        })
    );
