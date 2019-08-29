export const CreateContactNote = `mutation CreateContactNote($input: CreateContactNoteInput!) {
    createContactNote(input: $input) {
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
`;


export const RemoveContactNote = `mutation RemoveContactNote($input: DeleteContactNoteInput!) {
    deleteContactNote(input: $input) {
        id
    }
}
`;

export const UpdateContactNote = `mutation UpdateContactNote($input: UpdateContactNoteInput!) {
    updateContactNote(input: $input) {
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
`;
