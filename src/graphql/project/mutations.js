export const UpdateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
        id
        reference
        title
        status
        client {
            id
        }
        principalContact
        otherContact
        testingDate
        cost
        purchaseOrderNumber
        manager
        testerFacilitator
        clientFacilitator
        mainRecruiter
        facilities
        screenerApproved
        facilitationGuideSent
        testerProfilesSent
        facilitationGuideApproved
        testerProfilesApproved
        sessionDetailsSent
        attendees
        reportSent
        feedbackEntered
        videosUploaded
        invoiced
        invoiceNumber
        clientComments
        wuComments
        profiles
    }
}`;

export const RemoveProject = (
    sessions = true,
    contactNotes = true
) => `mutation RemoveProject(
        $input: DeleteProjectInput! 
        ${sessions ? '$sessionIds: [ID!]!' : ''}
        ${contactNotes ? '$contactNoteIds: [ID!]!' : ''}
    ) {
        ${sessions ? 'deleteSessions(ids: $sessionIds) { id }' : ''}
        ${contactNotes ? 'deleteContactNotes(ids: $contactNoteIds) { id }' : ''}
        deleteProject(input: $input) { id }    
    }
`;
