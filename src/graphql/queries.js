/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getClient = `query GetClient($id: ID!) {
  getClient(id: $id) {
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
export const listClients = `query ListClients(
  $filter: ModelClientFilterInput
  $limit: Int
  $nextToken: String
) {
  listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      projects {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProject = `query GetProject($id: ID!, $createdAt: AWSDate!) {
  getProject(id: $id, createdAt: $createdAt) {
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
export const listProjects = `query ListProjects(
  $id: ID
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProjects(
    id: $id
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
  }
}
`;
export const getSession = `query GetSession($id: ID!, $date: AWSDate!) {
  getSession(id: $id, date: $date) {
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
export const listSessions = `query ListSessions(
  $id: ID
  $date: ModelStringKeyConditionInput
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSessions(
    id: $id
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      project {
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
export const getContactNote = `query GetContactNote($id: ID!, $date: AWSDate!) {
  getContactNote(id: $id, date: $date) {
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
export const listContactNotes = `query ListContactNotes(
  $id: ID
  $date: ModelStringKeyConditionInput
  $filter: ModelContactNoteFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listContactNotes(
    id: $id
    date: $date
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      type
      project {
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
      }
    }
    nextToken
  }
}
`;
