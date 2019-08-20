/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = `mutation CreateBlog($input: CreateBlogInput!) {
  createBlog(input: $input) {
    id
    name
    posts {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const updateBlog = `mutation UpdateBlog($input: UpdateBlogInput!) {
  updateBlog(input: $input) {
    id
    name
    posts {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const deleteBlog = `mutation DeleteBlog($input: DeleteBlogInput!) {
  deleteBlog(input: $input) {
    id
    name
    posts {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    title
    blog {
      id
      name
      posts {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
    }
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
      comments {
        nextToken
      }
    }
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
  }
}
`;
