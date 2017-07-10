import { Classifies } from '../../../../collections/classifies'

const rootQuery = {
  getTasks: (_,{}) => {
    return [{_id: "task"}];
  },
  categories: (_, {}) => {
    return Classifies.find({isCategory: true, active: true}).fetch();
  }
}
export default rootQuery;
