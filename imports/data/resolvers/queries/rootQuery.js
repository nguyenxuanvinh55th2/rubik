import { Classifies } from '../../../../collections/classifies'

const rootQuery = {
  categories: (_, {}) => {
    return Classifies.find({isCategory: true, active: true}).fetch();
  },
  stockModels: (_, {limit}) => {
    if(limit) {
      return StockModels.find({active: true}, {limit}, {createdAt: -1}).fetch();
    } else {
        return StockModels.find({active: true}).fetch();
    }
  },
  stockModelById: (_, {_id}) => {
    return StockModels.findOne({_id, active: true});
  },
  getInVoice: (_, {token}) => {
    return Invoices.findOne({_id: token});
  },
  stockTypes: (_, {}) => {
    return StockTypes.find({active: true, isProduct: true}).fetch();
  },
  stockModel: (_, {_id}) => {
    return StockModels.findOne({_id});
  },
  invoices: (_, {_id}) => {
    return Invoices.find({status: {$ne: 100}, status: {$ne: 0}}).fetch();
  },
  posts: () => {
    return Posts.find({active: true}).fetch();
  },
  posts: (_,{limit}) => {
    if(limit){
      return Posts.find({active: true},{limit}).fetch();
    }
    else {
      return Posts.find({active: true}).fetch();
    }
  },
  post: (_, {_id}) => {
    return Posts.findOne({_id: _id})
  },
  slider: () => {
    return Sliders.findOne({_id: '0'})
  }
}
export default rootQuery;
