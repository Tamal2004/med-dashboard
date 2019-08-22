export const listTestersHome = `query fetchTestersHome {
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
