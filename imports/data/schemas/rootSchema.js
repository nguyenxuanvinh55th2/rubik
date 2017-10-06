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
      weight: Float
      colors: [ColorStock]
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
      origin: String
    }
    type ColorStock{
      _id: String
      name: String
      isBasicColor: Boolean
      color: String
      image: File
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
      note: String
    }
    type InvoiceDetail {
      _id: String
      countInStore: Int
      stockModel: StockModel
      quantity: Int
      amount: String
      invoice: Invoice
      createdAt: Float
      votes: [Vote]
      color: ColorStock
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
      image: File
      link: String
      type: SliderType
    }
    type SliderType {
      _id: String
      name: String
      type: String
    }
    type Email {
      address: String
      verified: Boolean
    }
    type Notification {
      _id: String
      title: String
      isReaded: String
      link: String
      type: String
      createdAt: Float
    }
    type User {
      _id: String
      emails: [Email]
      username: String
      fullName: String
      firstName: String
      lastName: String
      email: String
      token: String
      image: String
      dateOfBirth: Float
      gender: Boolean
    }
    type Color {
      _id: String
      name: String
      isBasicColor: Boolean
      color: String
      image: File
    }
    type Query {
      categories: [Classify]
      colors: [Color]
      customers: [Classify]
      stockModels(limit: Int): [StockModel]
      stockModelHome(limit: Int): [StockModel]
      stockModelById(_id: String!): StockModel
      getInVoice(token: String!): Invoice
      stockTypes(query: String): [StockType]
      stockModel(_id: String): StockModel
      posts(limit: Int): [Post]
      invoices: [Invoice]
      post(_id: String): Post
      sliders(query: String): [Slider]
      getAllPostByType(stockTypeId: String): [Post]
      getPostTypeLimit(stockTypeId: String, offset: Int, limit: Int): [Post]
      findProduct(query: String, offset: Int, limit: Int): [StockModel]
      getAllStockModelSearch(keyCode: String): [StockModel]
      getTopStockModel(limit: Int) : [StockModel]
      invoicesByDate(dateStart: Float, dateEnd: Float): [Invoice]
      users: [User]
      notifications: [Notification]
    }
    type Mutation {
      removeCategories(userId: String!, _id: String!): String
      insertCategories(userId: String!, info: String!): String
      removeColor(userId: String!, _id: String!): String
      insertColor(userId: String!, info: String!): String
      insertSlider(userId: String!, info: String!): String
      insertStockModel(userId: String!, info: String!): String
      insertFiles(userId: String, info: String): String
      insertInvoice(token: String!, info: String): String
      insertInvoiceDetail(token: String!, info: String): String
      updateInvoiceDetail(token: String!, _id: String!, number: Int): String
      removeStockType(userId: String!, _id: String!): String
      insertStockType(userId: String!, info: String!): String
      removeInvoiceDetail(_id: String!): String
      orderDevoice(token: String!, info: String): String
      ratingStockModel(token: String, _id: String, info: String): String
      updateStockModel(userId: String ,_id: String, info: String): String
      cancelInvoice(userId: String, _id: String): String
      verifyInvoice(userId: String, _id: String): String
      completeInvoice(userId: String, _id: String): String
      insertPost(userId: String, info: String): String
      updatePost(userId: String, _id: String, info: String): String
      saveUser(token: String!, info: String): String
      removeUser(token: String!, id: String): String
      changePassword(userId: String, password: String, oldPassword: String): String
      updateSlider(userId: String,_id: String, info: String): String
    }
`
export default rootSchema;
