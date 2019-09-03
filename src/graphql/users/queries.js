export const ListUsers = `query listUsers {
    listUsers(limit: 500) {
        items{
          id,
          email,
          firstName,
          lastName
        }       
    }
}`;
