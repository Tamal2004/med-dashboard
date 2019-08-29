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
            'Latest Project Date': latestProjectDate || '',
            actions: {}
        })
    );
