import React from 'react';

import { Link } from 'components';

import { composeSortableDate } from './common';

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
            'Latest Project': latestProjectId
                ? {
                      Component: (
                          <Link to={`/project/${latestProjectId}`}>
                              {latestProjectReference}
                          </Link>
                      ),
                      value: latestProjectReference
                  }
                : 'No Projects',
            'Latest Project Date': composeSortableDate(
                latestProjectDate,
                'No Project Dates'
            ),
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
                Component: <Link to={`/project/${id}`}>{title}</Link>,
                value: title
            },
            'Observed Date': composeSortableDate(testingDate),
            'Project Status': status,
            'Principal Contact': principalContact
        })
    );
