import { deserializeDate } from 'libs';

export const normalizeProjects = ({ items = [] }) =>
    items.map(({ client: { id, name }, testingDate, ...project }) => ({
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

export const normalizeUpdatedProject = ({ id, profiles, ...projectData }) => ({
    ...normalizeProjectForm(projectData),
    projectData: {
        id,
        profiles: profiles.map(profile => ({
            profile
        }))
    }
});

export const normalizeProject = ({
    id,
    profiles,
    sessions: { items: sessionsData = [] } = {},
    ...projectData
}) => {
    const sessions = sessionsData.map(
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
            profiles: profiles.map(profile => ({
                profile
            })),
            sessions
        }
    };
};
