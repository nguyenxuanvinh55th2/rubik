import { Mongo } from 'meteor/mongo';

Invoices = new Mongo.Collection('invoices');
Invoices.allow({
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
