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
        firstName
        lastName
    }
}
`;

export const DeleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
        id
            id
    }
}
`;
