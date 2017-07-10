const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
    type Task {
      _id: String
    }
    type Query {
      getTasks: [Task]
    }
    type Mutation {
      removeTask(_id: String): String
    }
`
export default rootSchema;
