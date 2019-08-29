import React from 'react';

import { Link } from 'components';

export const generateClientList = clientList =>
    clientList.map(
        ({
            id,
            name,
            latestProjectId,
            latestProjectReference,
            latestProjectDate
        }) => ({
            Client: {
                editable: true,
                Component: <Link to={`/client/${id}`}>{name}</Link>,
                value: name
            },
            'Latest Project': {
                Component: (
                    <Link
                        to={
                            latestProjectId
                                ? `/project/${latestProjectId}`
                                : '/client'
                        }
                    >
                        {latestProjectReference || 'No Projects'}
                    </Link>
                ),
                value: latestProjectReference || 'No Projects'
            },
            'Latest Project Date': latestProjectDate || 'No Project Dates',
            actions: {}
        })
    );

export const generateClientProjects = clientProjects =>
    clientProjects.map(
        ({ id, reference, title, testingDate, status, principalContact }) => ({
            'Project Reference': {
                Component: <Link to={`/project/${id}`}>{reference}</Link>,
                value: reference
            },
            'Project Title': {
                Component: <Link to={`/project/${reference}`}>{title}</Link>,
                value: title
            },
            'Observed Date': testingDate,
            'Project Status': status,
            'Principal Contact': principalContact
        })
    );
