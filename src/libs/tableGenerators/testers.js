import React from 'react';

import { Link } from 'components';

export const generateTesterList = testerList =>
    testerList.map(
        ({
            testerName,
            testerNumber,
            lastContactDate,
            lastProject,
            lastTestingDate
        }) => ({
            'Tester Name': {
                Component: (
                    <Link to={`/tester/${testerNumber}`}>{testerName}</Link>
                ),
                value: testerName
            },
            'Last Project': {
                Component: (
                    <Link
                        to={lastProject ? `/project/${lastProject}` : '/tester'}
                    >
                        {lastProject || 'No Projects'}
                    </Link>
                ),
                value: lastProject || 'No Projects'
            },
            'Last Testing Date': lastTestingDate || 'No Sessions',
            'Last Contact Date': lastContactDate || 'No Contacts'
        })
    );

export const generateTesterSessions = testerSessions =>
    testerSessions.map(
        ({
            date,
            time,
            clientId,
            clientName,
            projectId,
            projectReference,
            notes
        }) => ({
            Date: date,
            Time: time,
            Client: {
                Component: <Link to={`/client/${clientId}`}>{clientName}</Link>,
                value: clientName
            },
            Project: {
                Component: (
                    <Link to={`/project/${projectId}`}>{projectReference}</Link>
                ),
                value: projectReference
            },
            Notes: notes
        })
    );

export const generateTesterContactNotes = testerContactNotes =>
    testerContactNotes.map(
        ({ date, projectId, projectReference, type, contactedBy, note }) => ({
            Date: date,
            Project: {
                Component: (
                    <Link to={`/project/${projectId}`}>{projectReference}</Link>
                ),
                value: projectReference
            },
            'Contact Type': type,
            'Contacted By': contactedBy,
            Details: note
        })
    );
