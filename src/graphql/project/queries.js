export const listProjectClients = `query ListProjectClients {
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
