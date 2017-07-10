const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
    type Task {
      _id: String
    }
    type Classify {
      _id: String
      name: String
      active: Boolean
      isColor: Boolean
      isCategory: Boolean
      createdAt: Float
    }
    type Query {
      getTasks: [Task]
      categories: [Classify]
    }
    type Mutation {
      removeTask(_id: String): String
      removeCategories(userId: String!, _id: String!): String
      insertCategories(userId: String!, info: String!): String
    }
`
export default rootSchema;
