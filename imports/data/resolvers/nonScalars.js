const NonScalars = {
  StockModel :{
      images: ({images}) => images
  },
  Invoice: {
    invoiceDetails: ({_id}) => InvoiceDetails.find({'invoice._id': _id}).fetch()
  },
  InvoiceDetail: {
    stockModel: ({stockModel}) => stockModel
  }
}
export default NonScalars;
