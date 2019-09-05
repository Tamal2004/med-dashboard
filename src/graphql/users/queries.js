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

export const FetchUserByEmail = `query FetchUserByEmail($filter:ModelUserFilterInput){
  listUsers(filter:$filter){
    items{
      id
    }
  }
}`;
