import { Classifies } from '../../../../collections/classifies';
import { Email } from 'meteor/email';
import CryptoJS from "crypto-js";
import accounting from 'accounting'
function sendMail_Notification(notification){
  let content = '<div>' + notification + '</div>';
  Email.send({
      from: 'noreply.lokatech@gmail.com',
      // bcc: 'nguyenxuanvinh55th2@gmail.com',
      bcc: 'rubiknhatrang@gmail.com',
      subject: 'RUBIK NHA TRANG',
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
  saveUser: (_, {token, info}) => {
      var hashedToken = Accounts._hashLoginToken(token);
      var user = Meteor.users.find({'services.resume.loginTokens': {$elemMatch: {hashedToken: hashedToken}}}).fetch()[0];
      if(user) {
          info = JSON.parse(info);
          if(!info._id) {
            let userByName = Meteor.users.findOne({username: info.username});
            if(userByName) {
              return 'userNameExist';
            }
            let userByMail = Meteor.users.findOne({'emails': {$elemMatch: {address: info.email}}});
            if(userByMail) {
              return 'emailExist';
            }
          }
          let profile = {
              firstName: info.firstName,
              lastName: info.lastName
          };
          if(profile.firstName && profile.lastName) {
              profile.fullName = info.lastName + ' ' + info.firstName;
          } else if(profile.firstName) {
              profile.fullName = profile.firstName;
          } else {
              profile.fullName = profile.lastName;
          }
          if(info._id){
              return Meteor.users.update({_id:info._id}, {$set:{"profile":profile}});
          } else {
              return Accounts.createUser({username: info.username, email: info.email, password: info.password, profile});
          }
      }
  },
  removeUser: (_, {token, id}) => {
      var hashedToken = Accounts._hashLoginToken(token);
      var user = Meteor.users.find({'services.resume.loginTokens': {$elemMatch: {hashedToken: hashedToken}}}).fetch()[0];
      if(user) {
          if(id === '0' || id === '1'){
              throw 'Not allow!';
          } else {
              return Meteor.users.remove(id);
          }
      }
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
            let indexValue = 0;
            new Promise(function(resolve, reject) {
              __.forEach(docData, (content, key)=>{
                indexValue +=1;
                  if(content.fileName){
                      imageData[key] = content;
                      imageData[key].file = content.file.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
                      content = '';
                  }
                  if(indexValue >= docData.length){
                    resolve();
                  }
              });
            }).then(() => {
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
            })
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
    let amount = info.quantity * (invoiceDetail ? invoiceDetail.stockModel.price : info.stockModel.price) - info.quantity * (invoiceDetail ? invoiceDetail.stockModel.saleOff : info.stockModel.saleOff);
    let docAmount = invoice.amount + amount;
    let total = docAmount;
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
  updateInvoiceDetail(_, {token, _id, number}) {
    let invoice = Invoices.findOne({_id: token, status: 0});
    let invoiceDetail = InvoiceDetails.findOne({'_id': _id});
    let amount = number * invoiceDetail.stockModel.price - number * invoiceDetail.stockModel.saleOff;
    let docAmount = invoice.amount - invoiceDetail.amount + amount;
    let total = docAmount;
    InvoiceDetails.update({_id}, {$set: {
      quantity: number,
      amount: amount
    }});
    Invoices.update({_id: token}, {$set: {
      amount: docAmount,
      total
    }});
    return;
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
    let total = docAmount;
    InvoiceDetails.remove(_id);
    Invoices.update({_id: invoice._id}, {$set: {
      amount: docAmount,
      total
    }});
    return
  },
  orderDevoice: (_, {token, info}) => {
    info = JSON.parse(info);
    return Invoices.update({_id: token}, {$set: {
      customer: info,
      status: 1
    }}, (err) => {
      if(err) {
      } else {
          notifacation = {
            title: info.name + ' đã đặt hàng trên website của bạn',
            isReaded: false,
            link: '/orderDevoice',
            type: 'order',
            createdAt: moment().valueOf()
          }
          Notifications.insert(notifacation);
          let detail = InvoiceDetails.find({
            'invoice._id': token
          }).fetch();
          if(detail){
            let content = '';
            content += '</br><h1 style="text-align: center">Đặt hàng rubik nha trang</h1>' +
                '<h2 style="text-align: center; font-weight: normal;">' + moment().format("DD/MM/YYYY HH:mm") + '</h2>' +
                '<table style="width: 100%;">' +
                '<tr><td>Tên khách hàng:</td><td style="font-weight: 600;">' + info.name + '</td><td>Địa chỉ mail</td><td style="font-weight: 600;">' + info.email + '</td></tr>' +
                '<tr><td>Số điện thoại:</td><td style="font-weight: 600;">' + info.mobile + '</td><td>Địa chỉ:</td><td style="font-weight: 600;">' + info.address + '</td></tr>' +
                '</table></br>';
            content += '<h2></h2><table style="width: 100%; border-collapse: collapse; border: 1px solid;"><tr>';
            content += '<th style="border: 1px solid;">Tên sản phẩm</th>';
            content += '<th style="border: 1px solid;">Màu sắc</th>';
            content += '<th style="border: 1px solid;">Số lượng</th>';
            content += '<th style="border: 1px solid;">Thành tiền</th>';
            content += '</tr>';
            let total = 0;
            __.forEach(detail, (stockModel) => {
              total += stockModel.quantity * stockModel.amount;
              content += '<tr>';
              content += '<td style="border: 1px solid;">' + stockModel.stockModel.name + '</td>';
              content += '<td style="border: 1px solid;">' + stockModel.color + '</td>';
              content += '<td style="border: 1px solid;">' + stockModel.quantity + '</td>';
              content += '<td style="border: 1px solid;">' + stockModel.amount + '</td>';
              content += '</tr>';
            });
            content += '</table>';
            content += '<div style="text-align: right;"><h3>Tổng: ' + accounting.formatNumber(total) + '</h3></div>';
            sendMail_Notification(content);
          }
      }
    });
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
  },
  changePassword: (_, {userId, password, oldPassword}) => {
    let user = Meteor.users.findOne({_id: userId});
    if(user){
        var decryptedOld = CryptoJS.AES.decrypt(oldPassword, "def4ult");
        var plaintextOld = decryptedOld.toString(CryptoJS.enc.Utf8);
        var result = Accounts._checkPassword(user, plaintextOld);
        if(result.error){
            throw "Wrong old password!";
        } else {
            var decrypted = CryptoJS.AES.decrypt(password, "def4ult");
            var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
            return Accounts.setPassword(user._id, plaintext, {logout:false});
        }
    } else {
        throw "user logged out!";
    }
  },
  updateSlider: (_, {userId, _id, info}) => {

  }
}
export default rootMutation
