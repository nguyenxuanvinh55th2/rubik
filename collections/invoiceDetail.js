import { Mongo } from 'meteor/mongo';

InvoiceDetails = new Mongo.Collection('invoiceDetails');
InvoiceDetails.allow({
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
