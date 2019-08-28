export const CreateSession = `mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
        id
        date
        time
        project {
            id
            reference
            client {
                id
                name
            }
        }
        notes
    }
}
`;

export const RemoveSession = `mutation RemoveSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
        id
    }
}
`;

export const UpdateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
    updateSession(input: $input) {
        id
        date
        time
        project {
            id
            reference
            client {
                id
                name
            }
        }
        notes
    }
}
`;
