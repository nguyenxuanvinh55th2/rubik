import { Classifies } from '../../../../collections/classifies';
import moment from 'moment';

const rootMutation = {
  insertCategories: (_,{ userId, info }) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      info = JSON.parse(info);
      info.createdAt = moment().valueOf();
      info.createdBy = {
        _id: user._id,
        username: user.username
      }
      return Classifies.insert(info);
    }
    return;
  },
  removeCategories: (_,{ userId, _id }) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      return Classifies.update({_id}, {$set: {active: false}});
    }
    return;
  },
  insertFiles: (_, { userId, info }) => {
    info = JSON.parse(info);
    let docData = info.files;
    let imageData = {};
    __.forEach(docData, (content, key)=>{
        if(content.fileName){
            imageData[key] = content;
            imageData[key].file = content.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
            content = '';
        }
    });
    __.forEach(imageData, (img, key)=>{
        buf = new Buffer(img.file, 'base64');
        Files.write(buf, {fileName: img.fileName, type: img.type, userId: userId}, (err, fileRef)=>{
            if (err) {
              throw err;
            } else {
              console.log(fileRef);
            }
        }, true);
    });
  }
}
export default rootMutation
