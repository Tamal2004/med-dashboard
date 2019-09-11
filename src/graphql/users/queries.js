const { REACT_APP_QUERY_TABLE_LIMIT } = process.env;

export const ListUsers = `query listUsers {
    listUsers(limit: ${REACT_APP_QUERY_TABLE_LIMIT}) {
        items{
          id,
          email,
          firstName,
          lastName
        }       
    }
}`;

export const FetchUserByEmail = `query FetchUserByEmail($filter:ModelUserFilterInput){
  listUsers(filter:$filter limit: 1){
    items{
      id
    }
  }
}`;
