const { REACT_APP_QUERY_TABLE_LIMIT, REACT_APP_QUERY_LIST_LIMIT } = process.env;

export const ListClients = `query ListClients($filter: ModelClientFilterInput) {
    listSortedClients(filter: $filter sortDirection: DESC limit: ${REACT_APP_QUERY_TABLE_LIMIT}) {
        items {
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
}`;

export const FetchClient = `query FetchClient($id: ID!) {
    getClient(id: $id) {
        name
        projects(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
                reference
                title
                testingDate
                status
                principalContact
            }
        } 
    }
}`;

export const FetchClientProjects = `query FetchClientProjects($id: ID!) {
    getClient(id: $id) {
        projects(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
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
        }
    }
}`;
