export const ListClients = `query ListClients {
    listSortedClients(sortDirection: DESC limit: 200) {
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
        projects {
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
