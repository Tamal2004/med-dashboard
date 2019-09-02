export const CreateUser = `mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
            email,
            firstName,
            lastName
    }
}
`;

export const UpdateUser = `mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
        id
            email,
            firstName,
            lastName
    }
}
`;
