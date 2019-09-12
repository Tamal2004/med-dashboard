const {
    REACT_APP_QUERY_TABLE_LIMIT,
    REACT_APP_QUERY_SELECT_LIMIT,
    REACT_APP_QUERY_LIST_LIMIT,
    REACT_APP_QUERY_SEARCH_LIMIT
} = process.env;

export const ListProjectClients = `query ListProjectClients {
  listSortedClients(limit: ${REACT_APP_QUERY_SEARCH_LIMIT} sortDirection: DESC) {
    items {
      id
      name
    }
  }
}
`;

export const ListProjectUsers = `query ListProjectUsers {
  listSortedUsers(limit: ${REACT_APP_QUERY_SELECT_LIMIT} sortDirection: DESC) {
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
    listProjects(filter: $filter limit: ${REACT_APP_QUERY_SEARCH_LIMIT}) {
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
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
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

export const FetchProjectLists = `query FetchProjectLists($id: ID!) {
    getProject(id: $id) {
        id
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
            }
        }
        contactNotes(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
            }
        }
    }
}`;

export const ListProjects = `query ListProjects($filter: ModelProjectFilterInput) {
    listSortedProjects(filter: $filter limit: ${REACT_APP_QUERY_TABLE_LIMIT} sortDirection: DESC) {
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

export const SearchProjects = `query ListProjects($filter: ModelProjectFilterInput) {
    listSortedProjects(filter: $filter limit: ${REACT_APP_QUERY_SEARCH_LIMIT} sortDirection: DESC) {
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
    } limit: ${REACT_APP_QUERY_SEARCH_LIMIT} sortDirection: DESC) {
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
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
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
