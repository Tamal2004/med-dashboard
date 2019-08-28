/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClient = `query GetClient($id: ID!) {
  getClient(id: $id) {
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
export const listClients = `query ListClients(
  $filter: ModelClientFilterInput
  $limit: Int
  $nextToken: String
) {
  listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdBy
      projects {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
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
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getSession = `query GetSession($id: ID!) {
  getSession(id: $id) {
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
export const listSessions = `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      project {
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
      }
      profile
      location
      date
      time
      notes
    }
    nextToken
  }
}
`;
export const getTester = `query GetTester($id: ID!) {
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
export const listTesters = `query ListTesters(
  $filter: ModelTesterFilterInput
  $limit: Int
  $nextToken: String
) {
  listTesters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getContactNote = `query GetContactNote($id: ID!) {
  getContactNote(id: $id) {
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
export const listContactNotes = `query ListContactNotes(
  $filter: ModelContactNoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listContactNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      project {
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
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    firstName
    lastName
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      firstName
      lastName
    }
    nextToken
  }
}
`;
