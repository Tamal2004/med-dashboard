/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClient = `subscription OnCreateClient {
  onCreateClient {
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
export const onUpdateClient = `subscription OnUpdateClient {
  onUpdateClient {
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
export const onDeleteClient = `subscription OnDeleteClient {
  onDeleteClient {
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
export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
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
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
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
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
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
export const onCreateSession = `subscription OnCreateSession {
  onCreateSession {
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
export const onUpdateSession = `subscription OnUpdateSession {
  onUpdateSession {
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
export const onDeleteSession = `subscription OnDeleteSession {
  onDeleteSession {
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
export const onCreateTester = `subscription OnCreateTester {
  onCreateTester {
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
export const onUpdateTester = `subscription OnUpdateTester {
  onUpdateTester {
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
export const onDeleteTester = `subscription OnDeleteTester {
  onDeleteTester {
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
export const onCreateContactNote = `subscription OnCreateContactNote {
  onCreateContactNote {
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
export const onUpdateContactNote = `subscription OnUpdateContactNote {
  onUpdateContactNote {
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
export const onDeleteContactNote = `subscription OnDeleteContactNote {
  onDeleteContactNote {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    email
    firstName
    lastName
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    email
    firstName
    lastName
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    email
    firstName
    lastName
  }
}
`;
