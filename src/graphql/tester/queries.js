const {
    REACT_APP_QUERY_TABLE_LIMIT,
    REACT_APP_QUERY_LIST_LIMIT,
    REACT_APP_QUERY_SEARCH_LIMIT
} = process.env;

export const ListTesters = `query ListTesters {
  listSortedTesters(sortDirection: DESC limit: ${REACT_APP_QUERY_TABLE_LIMIT}) {
    items {
      id
      firstName
      surname
      sessions {
        items {
          date
          project {
            id
            reference
          }
        }
      }
      contactNotes {
        items {
          date
        }
      }
    }
  }
}`;

export const ListTestersSearch = `query ListTestersSearch($filter: ModelTesterFilterInput $nextToken: String) {
    listSortedTesters(filter: $filter limit: ${REACT_APP_QUERY_SEARCH_LIMIT} sortDirection: DESC nextToken: $nextToken) {
        items {
            id
            firstName
            surname
            dob
            email
        }
        nextToken
    }
}`;

export const CheckTesterEmail = `query CheckTesterEmail(
    $filter: ModelTesterFilterInput
) {
    listTesters(filter: $filter limit: ${REACT_APP_QUERY_SEARCH_LIMIT}) {
        items {
            email
        }
    }
}`;

export const FetchTester = `query FetchTester($id: ID!) {
    getTester(id: $id) {
        id
        title
        firstName
        surname
        email
        phone
        address
        house
        street
        town
        county
        postcode
        country
        gender
        dob
        maritalStatus
        hasChildren
        nationality
        ethnicity
        firstLanguage
        otherLanguages
        disability
        about
        employmentStatus
        jobTitle
        businessName
        employmentSector
        employeeCount
        subject
        educationStage
        institution
        clientNotes
        facilitatorComments
        lastUpdated
        contactNotes(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
                date
                project {
                    id
                    reference
                }
                type
                contactedBy
                note
            }
        }
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
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
    }
}
`;

export const FetchPublicTester = `query FetchPublicTester($id: ID!) {
    getTester(id: $id) {
        id
        title
        firstName
        surname
        email
        phone
        address
        house
        street
        town
        county
        postcode
        country
        gender
        dob
        maritalStatus
        hasChildren
        nationality
        ethnicity
        firstLanguage
        otherLanguages
        disability
        about
        employmentStatus
        jobTitle
        businessName
        employmentSector
        employeeCount
        subject
        educationStage
        institution
        lastUpdated
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
            }
        }
        contactNotes(limit: ${REACT_APP_QUERY_LIST_LIMIT}) {
            items {
                id
            }
        }
    }
}
`;

export const FetchTesterEmail = `query FetchTesterEmail($id: ID!) {
    getTester(id: $id) {
        email
        sessions(limit: ${REACT_APP_QUERY_LIST_LIMIT}){
            items{
                id
            }
        }
        contactNotes(limit: ${REACT_APP_QUERY_LIST_LIMIT}){
            items{
                id
            }
        }
    }
}
`;
