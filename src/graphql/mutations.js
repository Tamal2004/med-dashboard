/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClient = `mutation CreateClient($input: CreateClientInput!) {
  createClient(input: $input) {
    id
    name
    projects {
      items {
        id
        createdAt
        reference
        title
        status
        principalContact
        otherContact
        cost
        purchaseOrderNumber
        manager
        testerFacilitator
        clientFacilitator
        mainRecruiter
        facility
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
        feedbackObtained
        satisfactionScore
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
    projects {
      items {
        id
        createdAt
        reference
        title
        status
        principalContact
        otherContact
        cost
        purchaseOrderNumber
        manager
        testerFacilitator
        clientFacilitator
        mainRecruiter
        facility
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
        feedbackObtained
        satisfactionScore
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
    projects {
      items {
        id
        createdAt
        reference
        title
        status
        principalContact
        otherContact
        cost
        purchaseOrderNumber
        manager
        testerFacilitator
        clientFacilitator
        mainRecruiter
        facility
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
        feedbackObtained
        satisfactionScore
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
    createdAt
    reference
    title
    status
    client {
      id
      name
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    cost
    purchaseOrderNumber
    manager
    testerFacilitator
    clientFacilitator
    mainRecruiter
    facility
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
    feedbackObtained
    satisfactionScore
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
        contactedBy
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
    createdAt
    reference
    title
    status
    client {
      id
      name
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    cost
    purchaseOrderNumber
    manager
    testerFacilitator
    clientFacilitator
    mainRecruiter
    facility
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
    feedbackObtained
    satisfactionScore
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
        contactedBy
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
    createdAt
    reference
    title
    status
    client {
      id
      name
      projects {
        nextToken
      }
    }
    principalContact
    otherContact
    cost
    purchaseOrderNumber
    manager
    testerFacilitator
    clientFacilitator
    mainRecruiter
    facility
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
    feedbackObtained
    satisfactionScore
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
        contactedBy
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
    contactNotes {
      items {
        id
        type
        date
        contactedBy
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
    contactNotes {
      items {
        id
        type
        date
        contactedBy
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
    contactNotes {
      items {
        id
        type
        date
        contactedBy
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
    contactedBy
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
    contactedBy
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
      createdAt
      reference
      title
      status
      client {
        id
        name
      }
      principalContact
      otherContact
      cost
      purchaseOrderNumber
      manager
      testerFacilitator
      clientFacilitator
      mainRecruiter
      facility
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
      feedbackObtained
      satisfactionScore
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
    contactedBy
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
