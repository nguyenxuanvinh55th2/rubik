import { Mongo } from 'meteor/mongo';

export const Classifies = new Mongo.Collection('classifies');
Classifies.allow({
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
