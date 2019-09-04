export const ListProjectClients = `query ListProjectClients {
  listSortedClients(limit: 200 sortDirection: DESC) {
    items {
      id
      name
    }
  }
}
`;

export const ListProjectUsers = `query ListProjectUsers {
  listSortedUsers(limit: 200 sortDirection: DESC) {
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
    listSortedProjects(filter: $filter limit: 500 sortDirection: DESC) {
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
    listSortedProjects(filter: {
        or: [
            { status: { contains: "In Progress" } }   
            { status: { contains: "Pending" } }   
        ]
    } limit: 500 sortDirection: DESC) {
        items {
            id
            reference
            profiles
        }
    }
}`;

export const ListProjectReport = `query ListProjectReport($id: ID!) {
    getProject(id: $id) {
        id
        reference
        title
        sessions {
            items {
                profile
                location
                date
                time
                notes
                tester {
                    id
                    firstName
                    surname
                    phone
                    dob
                    gender
                    ethnicity
                    jobTitle
                }
            }
        }
    
    }
}`;
