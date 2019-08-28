/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = `mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
    id
    name
    createdBy
    projects {
      items {
        id
        reference
        title
        status
        principalContact
        otherContact
        testingDate
        cost
        purchaseOrderNumber
        facilities
        screenerApproved
        facilitationGuideSent
        testerProfilesSent
        facilitationGuideApproved
        testerProfilesApproved
        sessionDetailsSent
        attendees
        reportSent
        feedbackEntered
        videosUploaded
        invoiced
        invoiceNumber
        clientComments
        wuComments
        profiles
      }
      nextToken
    }
  }
}
`;
export const updateClient = `mutation UpdateClient($input: UpdateClientInput!) {
  updateClient(input: $input) {
    id
    name
    createdBy
    projects {
      items {
        id
        reference
        title
        status
        principalContact
        otherContact
        testingDate
        cost
        purchaseOrderNumber
        facilities
        screenerApproved
        facilitationGuideSent
        testerProfilesSent
        facilitationGuideApproved
        testerProfilesApproved
        sessionDetailsSent
        attendees
        reportSent
        feedbackEntered
        videosUploaded
        invoiced
        invoiceNumber
        clientComments
        wuComments
        profiles
      }
      nextToken
    }
  }
}
`;
export const deleteClient = `mutation DeleteClient($input: DeleteClientInput!) {
  deleteClient(input: $input) {
    id
    name
    createdBy
    projects {
      items {
        id
        reference
        title
        status
        principalContact
        otherContact
        testingDate
        cost
        purchaseOrderNumber
        facilities
        screenerApproved
        facilitationGuideSent
        testerProfilesSent
        facilitationGuideApproved
        testerProfilesApproved
        sessionDetailsSent
        attendees
        reportSent
        feedbackEntered
        videosUploaded
        invoiced
        invoiceNumber
        clientComments
        wuComments
        profiles
      }
      nextToken
    }
  }
}
`;
export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    reference
    title
    status
    client {
      id
      name
      createdBy
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    testingDate
    cost
    purchaseOrderNumber
    manager {
      id
      email
      firstName
      lastName
    }
    testerFacilitator {
      id
      email
      firstName
      lastName
    }
    clientFacilitator {
      id
      email
      firstName
      lastName
    }
    mainRecruiter {
      id
      email
      firstName
      lastName
    }
    facilities
    screenerApproved
    facilitationGuideSent
    testerProfilesSent
    facilitationGuideApproved
    testerProfilesApproved
    sessionDetailsSent
    attendees
    reportSent
    feedbackEntered
    videosUploaded
    invoiced
    invoiceNumber
    clientComments
    wuComments
    profiles
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
    contactNotes {
      items {
        id
        type
        date
        note
      }
      nextToken
    }
  }
}
`;
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    reference
    title
    status
    client {
      id
      name
      createdBy
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    testingDate
    cost
    purchaseOrderNumber
    manager {
      id
      email
      firstName
      lastName
    }
    testerFacilitator {
      id
      email
      firstName
      lastName
    }
    clientFacilitator {
      id
      email
      firstName
      lastName
    }
    mainRecruiter {
      id
      email
      firstName
      lastName
    }
    facilities
    screenerApproved
    facilitationGuideSent
    testerProfilesSent
    facilitationGuideApproved
    testerProfilesApproved
    sessionDetailsSent
    attendees
    reportSent
    feedbackEntered
    videosUploaded
    invoiced
    invoiceNumber
    clientComments
    wuComments
    profiles
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
    contactNotes {
      items {
        id
        type
        date
        note
      }
      nextToken
    }
  }
}
`;
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    reference
    title
    status
    client {
      id
      name
      createdBy
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    testingDate
    cost
    purchaseOrderNumber
    manager {
      id
      email
      firstName
      lastName
    }
    testerFacilitator {
      id
      email
      firstName
      lastName
    }
    clientFacilitator {
      id
      email
      firstName
      lastName
    }
    mainRecruiter {
      id
      email
      firstName
      lastName
    }
    facilities
    screenerApproved
    facilitationGuideSent
    testerProfilesSent
    facilitationGuideApproved
    testerProfilesApproved
    sessionDetailsSent
    attendees
    reportSent
    feedbackEntered
    videosUploaded
    invoiced
    invoiceNumber
    clientComments
    wuComments
    profiles
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
    contactNotes {
      items {
        id
        type
        date
        note
      }
      nextToken
    }
  }
}
`;
export const createSession = `mutation CreateSession($input: CreateSessionInput!) {
  createSession(input: $input) {
    id
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
    profile
    location
    date
    time
    notes
  }
}
`;
export const updateSession = `mutation UpdateSession($input: UpdateSessionInput!) {
  updateSession(input: $input) {
    id
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
    profile
    location
    date
    time
    notes
  }
}
`;
export const deleteSession = `mutation DeleteSession($input: DeleteSessionInput!) {
  deleteSession(input: $input) {
    id
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
    profile
    location
    date
    time
    notes
  }
}
`;
export const createTester = `mutation CreateTester($input: CreateTesterInput!) {
  createTester(input: $input) {
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
        type
        date
        note
      }
      nextToken
    }
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
  }
}
`;
export const updateTester = `mutation UpdateTester($input: UpdateTesterInput!) {
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
    contactNotes {
      items {
        id
        type
        date
        note
      }
      nextToken
    }
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
  }
}
`;
export const deleteTester = `mutation DeleteTester($input: DeleteTesterInput!) {
  deleteTester(input: $input) {
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
        type
        date
        note
      }
      nextToken
    }
    sessions {
      items {
        id
        profile
        location
        date
        time
        notes
      }
      nextToken
    }
  }
}
`;
export const createContactNote = `mutation CreateContactNote($input: CreateContactNoteInput!) {
  createContactNote(input: $input) {
    id
    type
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    date
    contactedBy {
      id
      email
      firstName
      lastName
    }
    note
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
  }
}
`;
export const updateContactNote = `mutation UpdateContactNote($input: UpdateContactNoteInput!) {
  updateContactNote(input: $input) {
    id
    type
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    date
    contactedBy {
      id
      email
      firstName
      lastName
    }
    note
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
  }
}
`;
export const deleteContactNote = `mutation DeleteContactNote($input: DeleteContactNoteInput!) {
  deleteContactNote(input: $input) {
    id
    type
    project {
      id
      reference
      title
      status
      client {
        id
        name
        createdBy
      }
      principalContact
      otherContact
      testingDate
      cost
      purchaseOrderNumber
      manager {
        id
        email
        firstName
        lastName
      }
      testerFacilitator {
        id
        email
        firstName
        lastName
      }
      clientFacilitator {
        id
        email
        firstName
        lastName
      }
      mainRecruiter {
        id
        email
        firstName
        lastName
      }
      facilities
      screenerApproved
      facilitationGuideSent
      testerProfilesSent
      facilitationGuideApproved
      testerProfilesApproved
      sessionDetailsSent
      attendees
      reportSent
      feedbackEntered
      videosUploaded
      invoiced
      invoiceNumber
      clientComments
      wuComments
      profiles
      sessions {
        nextToken
      }
      contactNotes {
        nextToken
      }
    }
    date
    contactedBy {
      id
      email
      firstName
      lastName
    }
    note
    tester {
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
        nextToken
      }
      sessions {
        nextToken
      }
    }
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    firstName
    lastName
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    firstName
    lastName
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    email
    firstName
    lastName
  }
}
`;
