const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
    type File {
      _id: String,
      file: String,
      fileName: String,
      type: String
    }
    type Classify {
      _id: String
      name: String
      active: Boolean
      isColor: Boolean
      isCategory: Boolean
      createdAt: Float
    }
    type StockType {
      _id: String
      name: String
      active: Boolean
    }
    type StockModel {
      _id: String
      name: String
      active: Boolean
      weight: String
      colors: [String]
      categories: [String]
      isLimited: Boolean
      isPromotion: Boolean
      images: [File]
      unit: String
      averagePrice: Float
      price: Float
      quantity: Int
      saleOff: Float
      description: String
      stockType: StockType
    }
    type Query {
      categories: [Classify]
      stockTypes: [StockType]
    }
    type Mutation {
      removeCategories(userId: String!, _id: String!): String
      insertCategories(userId: String!, info: String!): String
      insertStockModel(userId: String!, info: String!): String
      insertFiles(userId: String, info: String): String
      removeStockType(userId: String!, _id: String!): String
      insertStockType(userId: String!, info: String!): String
    }
`
export default rootSchema;
