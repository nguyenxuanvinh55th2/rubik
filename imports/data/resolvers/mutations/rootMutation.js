import { Classifies } from '../../../../collections/classifies';
import moment from 'moment';

const rootMutation = {
  removeTask: (_,{ _id }) => {
    //removeTask
    return _id;
  },
  insertCategories: (_,{ userId, info }) => {
    let user = Meteor.users.findOne({_id: userId});
    //if(user) {
      info = JSON.parse(info);
      info.createdAt = moment().valueOf();
      // info.createdBy = {
      //   _id: user._id,
      //   username: user.username
      // }
      return Classifies.insert(info);
    //}
    return;
  },
  removeCategories: (_,{ userId, _id }) => {
    let user = Meteor.users.findOne({_id: userId});
    //if(user) {
      // info.createdBy = {
      //   _id: user._id,
      //   username: user.username
      // }
      return Classifies.update({_id}, {$set: {active: false}});
    //}
    return;
  }
}
export default rootMutation
