export const ListClients = `query ListClients {
    listClients {
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
