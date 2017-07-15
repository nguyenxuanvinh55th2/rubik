import { Classifies } from '../../../../collections/classifies'

const rootQuery = {
  categories: (_, {}) => {
    return Classifies.find({isCategory: true, active: true}).fetch();
  },
  stockTypes: (_, {}) => {
    return StockTypes.find({active: true}).fetch();
  }
}
export default rootQuery;
