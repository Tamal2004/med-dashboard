export const ListProjectClients = `query ListProjectClients {
  listClients(limit: 500) {
    items {
      id
      name
    }
  }
}
`;

export const ListProjectUsers = `query ListProjectUsers {
  listUsers(limit: 500) {
    items {
      firstName
      lastName
    }
  }
}
`;

export const CheckProjectReference = `query CheckProjectReference(
    $filter: ModelProjectFilterInput
) {
    listProjects(filter: $filter limit: 1) {
        items {
            reference
        }
    }
}`;

export const FetchProject = `query FetchProject($id: ID!) {
    getProject(id: $id) {
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
        sessions {
            items {
                id
                profile
                date
                time
                notes
                tester {
                    id
                    firstName
                    surname
                }
            }
        }
    }
}`;

export const ListProjects = `query ListProjects($filter: ModelProjectFilterInput) {
    listProjects(filter: $filter limit: 500) {
        items {
            id
            client {
                id
                name
            }
            reference
            title
            testingDate
            status
            manager
        }
    }
}`;

export const ListIncompleteProjects = `query ListIncompleteProjects {
    listProjects(filter: {
        or: [
            { status: { contains: "In Progress" } }   
            { status: { contains: "Pending" } }   
        ]
    } limit: 500) {
        items {
            id
            reference
            profiles
        }
    }
}`;
