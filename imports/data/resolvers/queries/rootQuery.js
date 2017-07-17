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
    return StockTypes.find({active: true}).fetch();
  },
  stockModel: (_, {_id}) => {
    return StockModels.findOne({_id});
  }
}
export default rootQuery;
