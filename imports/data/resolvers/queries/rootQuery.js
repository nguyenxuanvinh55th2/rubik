import { Classifies } from '../../../../collections/classifies'

const rootQuery = {
  categories: (_, {}) => {
    return Classifies.find({isCategory: true, active: true}).fetch();
  },
  stockModels: (_, {limit}) => {
    if(limit) {
      return StockModels.find({active: true}, {limit}, {sort: {createdAt: -1}}).fetch();
    } else {
        return StockModels.find({active: true}, {sort: {createdAt: -1}}).fetch();
    }
  },
  stockModelById: (_, {_id}) => {
    return StockModels.findOne({_id, active: true});
  },
  getInVoice: (_, {token}) => {
    return Invoices.findOne({_id: token});
  },
  stockTypes: (_, {query}) => {
    if(typeof query == 'string'){
        query = JSON.parse(query)
    }
    return StockTypes.find(query).fetch();
  },
  stockModel: (_, {_id}) => {
    return StockModels.findOne({_id});
  },
  invoices: (_, {_id}) => {
    return Invoices.find({status: {$ne: 100}, status: {$ne: 0}}).fetch();
  },
  posts: (_,{limit}) => {
    if(limit){
      return Posts.find({active: true},{limit}, {'stockType._id': {$ne: '0'}}, {sort: {createdAt: -1}}).fetch();
    }
    else {
      return Posts.find({active: true}, {'stockType._id': {$ne: '0'}}, {sort: {createdAt: -1}}).fetch();
    }
  },
  post: (_, {_id}) => {
    return Posts.findOne({_id: _id})
  },
  slider: () => {
    return Sliders.findOne({_id: '0'})
  },
  getAllPostByType: (_, {stockTypeId}) => {
    return Posts.find({"stockType._id": stockTypeId}).fetch();
  },
  getPostTypeLimit: (_, {stockTypeId, offset, limit}) => {
    return Posts.find({"stockType._id": stockTypeId}, {skip: offset, limit: limit}).fetch();
  }
}
export default rootQuery;
