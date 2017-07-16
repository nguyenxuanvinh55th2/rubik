const NonScalars = {
  StockModel :{
    images: ({images}) => {
      if(images && images[0]){
        return Files.find({_id:{$in: images}}).each().map((img)=>{
            return {
              _id: img._id,
              file: img.link(),
              fileName: img.name,
              type: img.type
            };
        });
      }
      return []
    },
  },
  Invoice: {
    invoiceDetails: ({_id}) => InvoiceDetails.find({'invoice._id': _id}).fetch()
  },
  InvoiceDetail: {
    stockModel: ({stockModel}) => stockModel
  }
}
export default NonScalars;
