import { Mongo } from 'meteor/mongo';

Colors = new Mongo.Collection('colors');
Colors.allow({
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
