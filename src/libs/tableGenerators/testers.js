import React from 'react';

import { Link } from 'components';
import { normalizeTime } from 'normalizers';

export const generateTestersSearch = testersSearch =>
    testersSearch.map(
        ({ id, name, age, gender, email, about, clientNotes }) => ({
            'Tester Name': {
                Component: <Link to={`/tester/${id}`}>{name}</Link>,
                value: name
            },
            Age: age,
            Sex: gender,
            Email: email,
            Details: about,
            'Client Notes': clientNotes,
            actions: {
                checkAction: id => console.log('checked', id)
            }
        })
    );

export const generateTesterList = testerList =>
    testerList.map(
        ({
            testerName,
            testerNumber,
            lastContactDate,
            lastProjectReference,
            lastProjectId,
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
                        to={
                            lastProjectId
                                ? `/project/${lastProjectId}`
                                : '/tester'
                        }
                    >
                        {lastProjectReference || 'No Projects'}
                    </Link>
                ),
                value: lastProjectReference || 'No Projects'
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
            Date: { editable: true, Component: date, type: 'DateInput' },
            Time: {
                editable: true,
                Component: time,
                props: { normalize: normalizeTime }
            },
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
            Notes: { editable: true, Component: notes, type: 'MultiInput' },
            actions: {}
        })
    );

export const generateTesterContactNotes = (testerContactNotes, contactTypes) =>
    testerContactNotes.map(
        ({
            id,
            date,
            projectId,
            projectReference,
            type,
            contactedBy,
            note
        }) => ({
            id,
            Date: date,
            Project: {
                Component: (
                    <Link to={`/project/${projectId}`}>{projectReference}</Link>
                ),
                value: projectReference
            },
            'Contact Type': {
                editable: true,
                Component: type,
                type: 'Select',
                props: { data: contactTypes }
            },
            'Contacted By': contactedBy,
            Details: {
                editable: true,
                Component: note,
                type: 'MultiInput',
                props: { placeholder: 'Message details' }
            }
        })
    );
