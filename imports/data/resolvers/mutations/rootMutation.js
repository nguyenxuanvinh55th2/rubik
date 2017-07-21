import { Classifies } from '../../../../collections/classifies';
import { Email } from 'meteor/email';

function sendMail_Notification(notification){
  console.log("notification ", notification);
  let content = '<div>' + notification + '</div>';
  Email.send({
      from: 'noreply.lokatech@gmail.com',
      bcc: 'sanghuynh@gmail.com',
      subject: 'Thông báo đặt hàng',
      html: content
  }, (err) => {
      if (err) {
        console.log('err ', err);
      } else {
          console.log("message send mail");
      }
  });
  return;
}

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
  insertInvoice(_, {token, info}) {
    let invoice = Invoices.findOne({_id: token, status: 0});
    if(invoice) {
      return invoice._id
    }
    info = JSON.parse(info);
    Invoices.insert(info);
    return info;
  },
  insertInvoiceDetail(_, {token, info}) {
    info = JSON.parse(info);
    let invoice = Invoices.findOne({_id: token, status: 0});
    let invoiceDetail = InvoiceDetails.findOne({'invoice._id': token, 'stockModel._id': info.stockModel._id});
    let amount = info.quantity * (invoiceDetail ? invoiceDetail.stockModel.price : info.stockModel.price);
    let docAmount = invoice.amount + amount;
    let total = docAmount * invoice.discount / 100;
    if(invoiceDetail) {
      InvoiceDetails.update({_id: invoiceDetail._id}, {$inc: {
        quantity: info.quantity,
        amount: amount
      }});
    } else {
        InvoiceDetails.insert(info)
    }
    Invoices.update({_id: invoice._id}, {$set: {
      amount: docAmount,
      total
    }});
    return
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
  removeInvoiceDetail: (_, { _id }) => {
    let invoiceDetail = InvoiceDetails.findOne({_id});
    let invoice = Invoices.findOne({_id: invoiceDetail.invoice._id});
    let docAmount = invoice.amount - invoiceDetail.amount;
    let total = docAmount * invoice.discount / 100;
    InvoiceDetails.remove(_id);
    Invoices.update({_id: invoice._id}, {$set: {
      amount: docAmount,
      total
    }});
    return
  },
  orderDevoice: (_, {token, info}) => {
    info = JSON.parse(info);
    sendMail_Notification(info.name + ' Đã đặt hàng trên website của bạn');
    return Invoices.update({_id: token}, {$set: {
      customer: info,
      status: 1
    }});
  },
  ratingStockModel: (_, {token, _id, info}) => {
    info = JSON.parse(info);
    return StockModels.update({_id}, {$push: {
      votes: info
    }});
  },
  cancelInvoice: (_, {userId, _id}) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      return Invoices.update({_id}, {$set: {
        status: 100
      }});
    }
    return
  },
  verifyInvoice: (_, {userId, _id}) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      return Invoices.update({_id}, {$set: {
        status: 99
      }});
    }
    return
  },
  completeInvoice: (_, {userId, _id}) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user) {
      return Invoices.update({_id}, {$set: {
        status: 101
      }});
    }
    return
  },
  updateStockModel: (_, {userId,_id, info}) => {
    if(typeof info == 'string'){
      info = JSON.parse(info);
    }
    let future = new Future();
    let user = Meteor.users.findOne({_id: userId});
    if (user){
      let imagesExit = [], docData = [], imageData = {};
      info.data.updatedAt = moment().valueOf();
      info.data.updatedBy = {
         _id: user._id,
         username: user.username
      };
      __.forEach(info.images,(image) => {
        if(image._id)
          imagesExit.push(image._id);
          else {
            docData.push(image);
          }
      })
      info.data.images = imagesExit;
      future.return(
        StockModels.update({_id: _id}, {$set: info.data}, (err) => {
          if(err){
            console.log(err);
          }
          else {
            if(info.images){
              __.forEach(docData, (content, key)=>{
                  if(content.fileName){
                      imageData[key] = content;
                      imageData[key].file = content.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
                      content = '';
                  }
              });
              __.forEach(imageData, (img, key)=>{
                  buf = new Buffer(img.file, 'base64');
                  Files.write(buf, {fileName: img.fileName, userId: user._id, type: img.type}, (err, fileRef)=>{
                      if (err) {
                        throw err;
                      } else {
                        StockModels.update({ _id: _id },{ $push: { images: fileRef._id }});
                      }
                  }, true);
              });
            }
          }
        })
      )
    }
    return future.wait();
  },
  insertPost: (_,{userId, info}) => {
    let user = Meteor.users.findOne({_id: userId});
    let future = new Future();
    if (user){
      info = JSON.parse(info);
      let imageData = {};
      info.data.image = ''
      info.data.createdAt = moment().valueOf();
      info.data.createdBy = {
         _id: user._id,
         username: user.username
      };
      future.return(Posts.insert(info.data, (err,res) => {
        if (err) {console.log(err);}
        else if(res){
          let docData = [info.image];
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
                    Posts.update({ _id: res },{$set: {image: fileRef._id}});
                  }
              }, true);
          });
        }
      }))
    }
    return future.wait();
  },
  updatePost: (_, {userId, _id, info}) => {
    if(typeof info == 'string'){
      info = JSON.parse(info);
    }
    let future = new Future();
    let user = Meteor.users.findOne({_id: userId});
    if (user){
      let imagesExit = [], docData = [], imageData = {};
      info.data.updatedAt = moment().valueOf();
      info.data.updatedBy = {
         _id: user._id,
         username: user.username
      };
      if(info.image && info.image._id){
        future.return(
          Posts.update({_id: _id}, {$set: info.data}, (err) => {
            if(err){
              throw err;
            }
          })
        )
      }
      else {
        future.return(
          Posts.update({_id: _id}, {$set: info.data}, (err) => {
            if(err){
              console.log(err);
            }
            else {
              if(info.image && info.image.fileName){
                docData = [info.image]
                __.forEach(docData, (content, key)=>{
                    if(content.fileName){
                        imageData[key] = content;
                        imageData[key].file = content.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
                        content = '';
                    }
                });
                __.forEach(imageData, (img, key)=>{
                    buf = new Buffer(img.file, 'base64');
                    Files.write(buf, {fileName: img.fileName, userId: user._id, type: img.type}, (err, fileRef)=>{
                        if (err) {
                          throw err;
                        } else {
                          Posts.update({ _id: _id },{$set: { image: fileRef._id }});
                        }
                    }, true);
                });
              }
            }
          })
        )
      }
    }
    return future.wait();
  }
}
export default rootMutation
