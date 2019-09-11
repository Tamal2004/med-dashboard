export const CreateClient = `mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
        id
            name
            projects {
                items {
                    id
                    reference
                    testingDate
                }
            }
    }
}
`;

export const UpdateClient = `mutation UpdateClient($input: UpdateClientInput!) {
    updateClient(input: $input) {
        id
            name
            projects {
                items {
                    id
                    reference
                    testingDate
                }
            }
    }
}
`;

export const RemoveClient = (
    sessions = true,
    contactNotes = true,
    projects = true
) => `mutation RemoveClient(
        $input: DeleteClientInput! 
        ${sessions ? '$sessionIds: [ID!]!' : ''}
        ${contactNotes ? '$contactNoteIds: [ID!]!' : ''}
        ${projects ? '$projectIds: [ID!]!' : ''}
    ) {
        ${sessions ? 'deleteSessions(ids: $sessionIds) { id }' : ''}
        ${contactNotes ? 'deleteContactNotes(ids: $contactNoteIds) { id }' : ''}
        ${projects ? 'deleteProjects(ids: $projectIds) { id }' : ''}
        deleteClient(input: $input) { id }    
    }
`;
