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
