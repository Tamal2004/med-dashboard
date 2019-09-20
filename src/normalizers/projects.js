import { deserializeDate, calculateAge } from 'libs';

export const normalizeProjectUsers = users =>
    users.map(({ firstName, lastName }) => `${firstName} ${lastName}`);

export const normalizeProjects = projects =>
    projects.map(({ client: { id, name }, testingDate, ...project }) => ({
        ...project,
        clientId: id,
        clientName: name,
        testingDate: deserializeDate(testingDate)
    }));

export const normalizeProjectForm = ({
    client: { id: clientId = null } = {},
    ...projectData
}) => {
    const projectDetails = {
        client: clientId,
        ...Object.splice(projectData, [
            'reference',
            'title',
            'status',
            'principalContact',
            'otherContact',
            'testingDate',
            'cost',
            'purchaseOrderNumber',
            'manager',
            'testerFacilitator',
            'clientFacilitator',
            'mainRecruiter'
        ])
    };

    const projectManagement = Object.splice(projectData, [
        'facilities',
        'screenerApproved',
        'facilitationGuideSent',
        'testerProfilesSent',
        'facilitationGuideApproved',
        'testerProfilesApproved',
        'sessionDetailsSent',
        'attendees',
        'reportSent',
        'feedbackEntered',
        'videosUploaded',
        'invoiced',
        'invoiceNumber'
    ]);

    const clientFeedback = Object.splice(projectData, [
        'clientComments',
        'wuComments'
    ]);

    return { projectDetails, projectManagement, clientFeedback };
};

export const normalizeUpdatedProject = ({
    id,
    profiles = [],
    ...projectData
}) => ({
    ...normalizeProjectForm(projectData),
    projectData: {
        id,
        profiles: profiles
            ? profiles.map(profile => ({
                  profile
              }))
            : []
    }
});

export const normalizeProject = ({
    id,
    profiles = [],
    sessions: { items: sessionsData = [] } = {},
    ...projectData
}) => {
    const sessions = sessionsData
        .filter(session => !!session)
        .map(
            ({
                date,
                tester: { id: testerId, firstName, surname } = {},
                ...rest
            }) => ({
                date: deserializeDate(date),
                testerId,
                testerName: `${firstName} ${surname}`,
                ...rest
            })
        );

    return {
        ...normalizeProjectForm(projectData),
        projectData: {
            id,
            profiles: profiles
                ? profiles.map((profile = '') => ({
                      profile
                  }))
                : [],
            sessions
        }
    };
};

export const normalizeProjectReport = (
    { id, reference, title, sessions: { items: sessions = [] } = {} },
    testerIndices
) => {
    const reportData = sessions
        .filter(session => !!session)
        .map(
            ({
                tester: {
                    id: testerId,
                    firstName,
                    surname,
                    phone,
                    dob,
                    gender,
                    ...restTester
                },
                date,
                ...restReport
            }) => ({
                testerId,
                name: `${firstName} ${surname}`,
                phoneNumber: phone,
                age: calculateAge(dob),
                sex: gender,
                date: deserializeDate(date),
                ...restTester,
                ...restReport
            })
        )
        .filter((datum, idx) => testerIndices.includes(String(idx)));

    return { id, reference, title, reportData };
};

export const normalizeProjectsLists = projects =>
    projects.reduce(
        (
            acm,
            {
                id,
                sessions: { items: sessions = [] },
                contactNotes: { items: contactNotes = [] }
            }
        ) => ({
            sessionIds: [...acm.sessionIds, ...sessions.map(({ id }) => id)],
            contactNoteIds: [
                ...acm.contactNoteIds,
                ...contactNotes.map(({ id }) => id)
            ],
            projectIds: [...acm.projectIds, id]
        }),
        {
            sessionIds: [],
            contactNoteIds: [],
            projectIds: []
        }
    );
