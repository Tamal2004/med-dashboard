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
