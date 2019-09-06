import { createStore } from 'redux';
import uuid from 'uuid/v4';

// Local
import reducers from 'reducers';
import enhancers from './enhancers';

import { today } from 'libs';

//Temp
import loadDB from './All20Data';

const composeValue = value =>
    typeof value === 'string' &&
    value
        .split(/[\r\n]+/)
        .map(toTrim => toTrim.trim())
        .join('/n');

const composeDataString = data =>
    data
        .map(datum => {
            const composedDatum = Object.entries(datum).reduce(
                (acm, [key, value]) => {
                    const nullCheckedValue =
                        value === '&nbsp;' ||
                        (Array.isArray(value) && value.length === 0)
                            ? null
                            : value;

                    if (
                        typeof nullCheckedValue === 'boolean' ||
                        nullCheckedValue
                    ) {
                        let composedValue = '';
                        if (Array.isArray(nullCheckedValue)) {
                            const arrayValues = nullCheckedValue
                                .map(
                                    arrayValue =>
                                        `"${composeValue(arrayValue)}"`
                                )
                                .join(', ');
                            composedValue = `[ ${arrayValues} ]`;
                        } else if (typeof nullCheckedValue === 'boolean') {
                            composedValue = `${value}`;
                        } else {
                            composedValue = `"${composeValue(value)}"`;
                        }

                        return `${acm} ${key}: ${composedValue}`;
                    }
                    return acm;
                },
                ''
            );

            return `{${composedDatum} }`;
        })
        .join(' ');

const composeMutations = mutations => {
    mutations.forEach(({ mutation, entity, data }) => {
        const mutationString = `${mutation}(${entity}: [ ${composeDataString(
            data
        )} ]) { id }`;

        const fullMutationString = `mutation loadDB { ${mutationString} }`;
        console.log(fullMutationString);
    });
};

const composeClients = clients =>
    clients.reduce(
        (acm, { id, projects, ...client }) => {
            const newClientId = uuid();

            return {
                clientIds: { ...acm.clientIds, [id]: newClientId },
                clientData: [...acm.clientData, { id: newClientId, ...client }]
            };
        },
        { clientIds: {}, clientData: [] }
    );

/* Project Nullables
    title = No Title
    testingDate = today()
    principalContact
    projectManager = should be a user
    updatedAt = Check all and make latest else now
*/
const adminName = 'Matt Tamal';
const splice = (data, mapping) => {
    try {
        const mappingIsObject =
            typeof mapping === 'object' && !Array.isArray(mapping); // Is an object
        const dataKeys = mappingIsObject ? Object.keys(mapping) : [...mapping];

        const mapKeys = mappingIsObject ? Object.values(mapping) : null;

        const res = dataKeys.reduce((accumulator, key, index) => {
            if (typeof data[key] !== 'undefined') {
                if (mappingIsObject && mapKeys[index] !== '') {
                    return {
                        ...accumulator,
                        [mapKeys[index]]: data[key]
                    };
                } else {
                    return {
                        ...accumulator,
                        [key]: data[key]
                    };
                }
            } else {
                return accumulator;
                // throw Error(`Property '${key}' does not exist in object`);
            }
        }, {});
        return res;
    } catch (error) {
        console.error(error);
    }
};
const composeProjectUpdatedAt = project => {
    const dateValues = Object.values(
        splice(project, [
            'testingDate',
            'facilitationGuideSent',
            'testerProfilesSent',
            'facilitationGuideApproved',
            'testerProfilesApproved',
            'sessionDetailsSent',
            'reportSent',
            'feedbackEntered',
            'videosUploaded',
            'invoiced'
        ])
    ).filter(isNotNull => !!isNotNull);

    return !!dateValues.length
        ? Math.max(...dateValues.map(date => new Date(date).getTime()))
        : new Date().getTime();
};
const composeProjects = (projects, clientIds) =>
    projects.reduce(
        (
            acm,
            {
                id,
                client,
                title,
                testingDate,
                principalContact,
                manager,
                profiles,
                updatedAt,
                sessions,
                contactNotes,
                ...project
            }
        ) => {
            const newProjectId = uuid();

            const composedProfiles = [
                ...new Set(profiles.map(({ profileType }) => profileType))
            ];

            const projectDatum = {
                id: newProjectId,
                projectClientId: clientIds[client],
                title: title || 'No Title',
                testingDate: testingDate || today(),
                principalContact: principalContact || 'Unknown',
                manager: manager || adminName,
                profiles: composedProfiles,
                updatedAt: composeProjectUpdatedAt({ testingDate, ...project }),
                ...project
            };

            return {
                projectIds: { ...acm.projectIds, [id]: newProjectId },
                projectData: [...acm.projectData, projectDatum]
            };
        },
        { projectIds: {}, projectData: [] }
    );

/* Tester Nullables
    dob = ???
    updatedAt = getTime()
*/

const validateEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
const composeTesters = testers =>
    testers.reduce(
        (
            acm,
            {
                id,
                email,
                about,
                dob,
                updatedAt,
                sessions,
                contactNotes,
                ...tester
            }
        ) => {
            const newTesterId = uuid();
            const composedEmail =
                !email || validateEmail(email) === 'Invalid email address'
                    ? `${newTesterId}@archive.com`
                    : email;

            const testerDatum = {
                id: newTesterId,
                dob: dob || '1990-01-01',
                email: composedEmail,
                updatedAt: new Date(updatedAt).getTime(),
                about: about || 'Unknown',
                lastUpdated: updatedAt || today(),
                ...tester
            };

            return {
                testerIds: { ...acm.testerIds, [id]: newTesterId },
                testerData: [...acm.testerData, testerDatum]
            };
        },
        { testerIds: {}, testerData: [] }
    );

/*
    projectid = if null (or 0) set it with preset archive project
    date = today
    time = 12:00
 */
const archiveProjectId = 'tt';
const archiveTesterId = 'tt';
const composeSessions = (sessions, testerIds, projectIds) =>
    sessions.map(({ id, project, tester, date, time, ...session }) => {
        return {
            id: uuid(),
            sessionProjectId: !!project
                ? projectIds[project]
                : archiveProjectId,
            sessionTesterId: testerIds[tester],
            date: date || today(),
            time: time || '12:00',
            ...session
        };
    });

/* Contact note Nullables
projectid = if null (or 0) set it with preset archive project
testerid = if null (or 0) set it with archive tester
    contactedBy = should be a user
userid = if null set to admin
    date = today
    
    ; v
*/
const composeContactNotes = (contactNotes, testerIds, projectIds) =>
    contactNotes.map(
        ({ id, project, tester, contactedBy, date, ...contactNote }) => {
            return {
                id: uuid(),
                contactNoteProjectId: !!project
                    ? projectIds[project]
                    : archiveProjectId,
                contactNoteTesterId: !!tester
                    ? testerIds[tester]
                    : archiveTesterId,
                contactedBy: contactedBy || adminName,
                date: date || today(),
                ...contactNote
            };
        }
    );

const composeFullQuery = () => {
    // Data
    const { clients, projects, testers, sessions, contactNotes } = loadDB;

    // Ids -> Projects
    const { clientIds, clientData } = composeClients(clients);

    const { projectIds, projectData } = composeProjects(projects, clientIds);

    const { testerIds, testerData } = composeTesters(testers);

    const sessionData = composeSessions(sessions, testerIds, projectIds);

    const contactNoteData = composeContactNotes(
        contactNotes,
        testerIds,
        projectIds
    );

    const mutations = [
        { mutation: 'createClients', entity: 'clients', data: clientData },
        {
            mutation: 'createProjects',
            entity: 'projects',
            data: projectData.filter((a, i) => i < 5)
        },
        {
            mutation: 'createTesters',
            entity: 'testers',
            data: testerData.filter((a, i) => i < 20)
        }
        // {
        //     mutation: 'createSessions',
        //     entity: 'sessions',
        //     data: sessionData
        // },
        // {
        //     mutation: 'createContactNotes',
        //     entity: 'contactNotes',
        //     data: contactNoteData
        // }
    ];

    composeMutations(mutations);
    // console.log(composeMutation(mutations));

    return {};
};
composeFullQuery();
//
// console.log(composedClients);

export default createStore(reducers, {}, enhancers);
