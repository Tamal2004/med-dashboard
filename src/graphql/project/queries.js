export const ListProjectClients = `query ListProjectClients {
  listClients {
    items {
      id
      name
    }
  }
}
`;

export const CheckProjectReference = `query CheckProjectReference(
    $filter: ModelProjectFilterInput
) {
    listProjects(filter: $filter limit: 1) {
        items {
            reference
        }
    }
}`;

export const ListProjects = `query ListProjects {
    listProjects {
        items {
            id
            client {
                id
                name
            }
            reference
            title
            testingDate
            status
            manager
        }
    }
}`;
