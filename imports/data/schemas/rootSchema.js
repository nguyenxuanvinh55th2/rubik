const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
    type AccountingObject {
      _id: String
      name: String
      mobile: String
      email: String
      address: String
      isCustomer: Boolean
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
      code: String
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
      votes: [Vote]
    }
    type Vote {
      stars: Int
      comment: String
      name: String
      email: String
      createdAt: Float
    }
    type Invoice {
      _id: String
      code: String
      status: Int
      customer: AccountingObject
      amount: Int
      discount: Float
      total: Int
      createdAt: Float
      shipFee: Int
      invoiceDetails: [InvoiceDetail]
    }
    type InvoiceDetail {
      _id: String
      stockModel: StockModel
      quantity: Int
      amount: String
      invoice: Invoice
      createdAt: Float
      votes: [Vote]
    }
    type Query {
      categories: [Classify]
      stockModels(limit: Int): [StockModel]
      stockModelById(_id: String!): StockModel
      getInVoice(token: String!): Invoice
      stockTypes: [StockType]
      stockModel(_id: String): StockModel
    }
    type Mutation {
      removeCategories(userId: String!, _id: String!): String
      insertCategories(userId: String!, info: String!): String
      insertStockModel(userId: String!, info: String!): String
      insertFiles(userId: String, info: String): String
      insertInvoice(token: String!, info: String): String
      insertInvoiceDetail(token: String!, info: String): String
      removeStockType(userId: String!, _id: String!): String
      insertStockType(userId: String!, info: String!): String
      removeInvoiceDetail(_id: String!): String
      orderDevoice(token: String!, info: String): String
      ratingStockModel(token: String!, _id: String, info: String): String
      updateStockModel(userId: String ,_id: String, info: String): String
    }
`
export default rootSchema;
