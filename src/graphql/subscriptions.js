/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = `subscription OnCreateTodo {
  onCreateTodo {
    id
    name
    description
  }
}
`;
export const onUpdateTodo = `subscription OnUpdateTodo {
  onUpdateTodo {
    id
    name
    description
  }
}
`;
export const onDeleteTodo = `subscription OnDeleteTodo {
  onDeleteTodo {
    id
    name
    description
  }
}
`;
export const onCreateClient = `subscription OnCreateClient {
  onCreateClient {
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
export const onUpdateClient = `subscription OnUpdateClient {
  onUpdateClient {
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
export const onDeleteClient = `subscription OnDeleteClient {
  onDeleteClient {
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
export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
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
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
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
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
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
export const onCreateSession = `subscription OnCreateSession {
  onCreateSession {
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
export const onUpdateSession = `subscription OnUpdateSession {
  onUpdateSession {
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
export const onDeleteSession = `subscription OnDeleteSession {
  onDeleteSession {
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
export const onCreateContactNote = `subscription OnCreateContactNote {
  onCreateContactNote {
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
export const onUpdateContactNote = `subscription OnUpdateContactNote {
  onUpdateContactNote {
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
export const onDeleteContactNote = `subscription OnDeleteContactNote {
  onDeleteContactNote {
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
