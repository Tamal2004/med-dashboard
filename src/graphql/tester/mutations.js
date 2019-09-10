export const UpdateTester = `mutation UpdateTester($input: UpdateTesterInput!) {
    updateTester(input: $input) {
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
    }
}`;

export const RemoveTester = `mutation RemoveTester(
        $input: DeleteTesterInput! 
        $sessionIds: [ID!]!
        $contactNoteIds: [ID!]!
    ) {
        deleteSessions(ids: $sessionIds) { id }
        deleteContactNotes(ids: $contactNoteIds) { id }
        deleteTester(input: $input) { id }    
    }
`;

export const CreateTester = `mutation CreateTester($input: CreateTesterInput!) {
  createTester(input: $input) {
    id
    firstName
    surname
    email
  }
}`;
