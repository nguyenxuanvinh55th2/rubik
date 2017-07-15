import { Classifies } from '../../../../collections/classifies';

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
  },
  insertStockModel: (_,{userId,info}) => {
      let user = Meteor.users.findOne({_id: userId});
      let future = new Future();
      if (user){
        info = JSON.parse(info);
        let imageData = {};
        info.data.images = []
        info.data.createdAt = moment().valueOf();
        info.data.createdBy = {
           _id: user._id,
           username: user.username
        };
        future.return(StockModels.insert(info.data, (err,res) => {
          if (err) {console.log(err);}
          else if(res){
            let docData = info.images;
            __.forEach(docData, (content, key)=>{
                if(content.fileName){
                    imageData[key] = content;
                    imageData[key].file = content.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
                    content = '';
                }
            });
            __.forEach(imageData, (img, key)=>{
                buf = new Buffer(img.file, 'base64');
                Files.write(buf, {fileName: img.fileName, userId: userId, type: img.type}, (err, fileRef)=>{
                    if (err) {
                      throw err;
                    } else {
                      StockModels.update({ _id: res },{ $push: { images: fileRef._id }});
                    }
                }, true);
            });
          }
        }))
      }
      return future.wait();
  },
  insertStockType: (_,{ userId, info }) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      info = JSON.parse(info);
      info.createdAt = moment().valueOf();
      info.createdBy = {
        _id: user._id,
        username: user.username
      }
      return StockTypes.insert(info);
    }
    return;
  },
  removeStockType: (_,{ userId, _id }) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      return StockTypes.update({_id}, {$set: {active: false}});
    }
    return;
  },
}
export default rootMutation
