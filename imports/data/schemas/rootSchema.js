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
      stockType: StockType
    }
    type StockType {
      _id: String
      name: String
      active: Boolean
      categories: [Classify]
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
    type Post {
      _id: String
      title: String
      content: String
      description: String
      image: File
      stockType: StockType
      createdAt: Float
    }
    type Slider {
      _id: String
      name: String
      sliders: [DetailSlider]
    }
    type DetailSlider {
      image: File
      link: String
    }
    type Query {
      categories: [Classify]
      stockModels(limit: Int): [StockModel]
      stockModelById(_id: String!): StockModel
      getInVoice(token: String!): Invoice
      stockTypes(query: String): [StockType]
      stockModel(_id: String): StockModel
      posts(limit: Int): [Post]
      invoices: [Invoice]
      post(_id: String): Post
      slider: Slider
      getAllPostByType(stockTypeId: String): [Post]
      getPostTypeLimit(stockTypeId: String, offset: Int, limit: Int): [Post]
      findProduct(query: String, offset: Int, limit: Int): [StockModel]
      getAllStockModelSearch(keyCode: String): [StockModel]
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
      cancelInvoice(userId: String, _id: String): String
      verifyInvoice(userId: String, _id: String): String
      completeInvoice(userId: String, _id: String): String
      insertPost(userId: String, info: String): String
      updatePost(userId: String, _id: String, info: String): String
    }
`
export default rootSchema;
