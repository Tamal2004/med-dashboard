export const ListTesters = `query fetchTestersHome {
  listTesters {
    items {
      id
      firstName
      surname
      sessions {
        items {
          date
          project {
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

export const CheckTesterEmail = `query CheckTesterEmail(
    $filter: ModelTesterFilterInput
) {
    listTesters(filter: $filter limit: 1) {
        items {
            email
        }
    }
}`;
