const NonScalars = {
  StockModel :{
    images: ({images}) => {
      if(images && images[0]){
        return Files.find({_id:{$in: images}}).each().map((img)=>{
          console.log(img.link(), img);
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
    votes: ({votes}) => votes
  },
  Invoice: {
    invoiceDetails: ({_id}) => InvoiceDetails.find({'invoice._id': _id}).fetch()
  },
  InvoiceDetail: {
    stockModel: ({stockModel}) => stockModel,
    votes: ({stockModel}) => StockModels.findOne({_id: stockModel._id}).votes
  }
}
export default NonScalars;
