import { Mongo } from 'meteor/mongo';

StockTypes = new Mongo.Collection('stockTypes');
StockTypes.allow({
  insert: function () {
      return true;
  },
  update: function () {
      return true;
  },
  remove: function () {
      return true;
  }
});
