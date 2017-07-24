import { Classifies } from '../../../../collections/classifies'

const getSaleCountOfStockModel = (stockModelIds) => {
  let invoiceDetails = InvoiceDetails.find({'stockModel._id': {$in: stockModelIds}}).map(item => {
    return {
      stockModelId: item.stockModel._id,
      quantity: item.quantity
    }
  });
  invoiceDetails = __.groupBy(invoiceDetails, item => item.stockModelId);
  __.forEach(stockModelIds, item => {
    let count = 0;
    if(invoiceDetails[item]) {
      __.forEach(invoiceDetails[item], elm => count += elm.quantity);
      invoiceDetails[item] = count;
    } else {
      invoiceDetails[item] = 0;
    }
  });
  return invoiceDetails;
}

const rootQuery = {
  categories: (_, {}) => {
    return Classifies.find({isCategory: true, active: true}).fetch();
  },
  stockModels: (_, {limit}) => {
    if(limit) {
      return StockModels.find({active: true}, {sort: {createdAt: -1}}).fetch().slice(0, limit);
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
    return Invoices.find({status: {$nin: [100, 0, 101]}}, {sort: {createdAt: -1}}).fetch();
  },
  invoicesByDate: (_, {dateStart, dateEnd}) => {
    return Invoices.find(
      {
        $and: [
          {createdAt: {$gte: dateStart}},
          {createdAt: {$lte: dateEnd}}
        ]
      },
    ).fetch();
  },
  posts: (_,{limit}) => {
    if(limit){
      return Posts.find({active: true}, {'stockType._id': {$ne: '0'}}, {sort: {createdAt: -1}}).fetch().slice(0, limit);
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
  },
  findProduct: (_, {query, offset, limit}) => {
    if(typeof query == 'string') {
      query = JSON.parse(query);
    }
    return StockModels.find(query, {skip: offset, limit: limit}, {sort: {createdAt: -1}}).fetch();
  },
  getAllStockModelSearch: (_, { keyCode }) => {
    if (keyCode) {
      let condition = {
        $or: [
          {code: {$regex: keyCode, $options: 'iu'}},
          {name: {$regex: keyCode, $options: 'iu'}},
          {origin: {$regex: keyCode, $options: 'iu'}},
          {'stockType.name': {$regex: keyCode, $options: 'iu'}},
          {categories: {$regex: keyCode, $options: 'iu'}}
        ]
      }
      return StockModels.find({$and: [condition, {active: true}]}, {sort: {createdAt: -1}}).fetch();
    } else {
      return [];
    }
  },
  getTopStockModel: (_, {limit}) => {
    let stockModelsWithCount = [];
    let stockModels = StockModels.find({}).fetch();
    let invoiceWithCount = getSaleCountOfStockModel(stockModels.map(item => item._id));
    console.log("invoiceWithCount ", invoiceWithCount);
    let stock;
    __.forEach(stockModels, item => {
      stock = {
        _id: item._id,
        stockModel: item,
        quantity: invoiceWithCount[item._id]
      }
      stockModelsWithCount.push(stock);
    })
    stockModelsWithCount = stockModelsWithCount.sort((a, b) => b.quantity - a.quantity).slice(0, limit);
    console.log("stockModels ", stockModelsWithCount);
    return stockModelsWithCount.map(item => item.stockModel);
  },
  users: (_, {}) => {
    return Meteor.users.find({}).fetch();
  }
}
export default rootQuery;
