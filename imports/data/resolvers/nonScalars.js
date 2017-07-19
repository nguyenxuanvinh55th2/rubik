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
    votes: ({votes}) => votes,
  },
  Invoice: {
    invoiceDetails: ({_id}) => InvoiceDetails.find({'invoice._id': _id}).fetch()
  },
  InvoiceDetail: {
    stockModel: ({stockModel}) => stockModel,
    votes: ({stockModel}) => StockModels.findOne({_id: stockModel._id}).votes
  },
  Post: {
    image: ({image}) => {
      if(image){
        let file = Files.findOne({_id: image});
        if(file){
          return {
            _id: file._id, fileName: file.fileName, type: file.type,
            file: file.link()
          }
        }
      }
      return {}
    }
  },
  DetailSlider: {
    image: ({image}) => {
      if(image){
        let file = Files.findOne({_id: image});
        if(file){
          return {
            _id: file._id, fileName: file.fileName, type: file.type,
            file: file.link()
          }
        }
      }
      return {}
    }
  }
}
export default NonScalars;
