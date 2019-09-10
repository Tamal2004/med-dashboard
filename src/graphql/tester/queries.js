export const ListTesters = `query ListTesters {
  listSortedTesters(sortDirection: DESC limit: 500) {
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

export const ListTestersSearch = `query ListTestersSearch($filter: ModelTesterFilterInput) {
    listSortedTesters(filter: $filter limit: 500 sortDirection: DESC) {
        items {
            id
            firstName
            surname
            dob
            email
        }
    }
}`;

export const CheckTesterEmail = `query CheckTesterEmail(
    $filter: ModelTesterFilterInput
) {
    listTesters(filter: $filter limit: 1) {
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
        contactNotes {
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
        sessions {
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
        sessions {
            items {
                id
            }
        }
        contactNotes {
            items {
                id
            }
        }
    }
}
`;
