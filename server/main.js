import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import express from 'express';
import cors from 'cors';
Future = Npm.require('fibers/future');
__ = require('lodash');
moment = require('moment');

import { Accounts } from 'meteor/accounts-base';

import {createApolloServer} from 'meteor/apollo';
import schema from '/imports/data';
import bodyParser from 'body-parser';
// createApolloServer({
//   schema,
//   graphiql: Meteor.isDevelopment,
//   pretty: true,
//   configServer: express().use(bodyParser.json())
// });
createApolloServer({
  schema,
  graphiql: Meteor.isDevelopment,
  pretty: true,
  configServer: express().use('*', cors())
});

Meteor.startup(() => {
  if (Meteor.users.find({}).count() === 0) {
      Meteor.users.insert({
          _id: '0',
          username: 'admin',
          emails: [
              {
                  address: 'nguyenxuanvinh55th2@gmail.com',
                  verified: true
              }
          ],
          profile:{
              permissions: []
          },
          friendList: [],
          childrents: []
      });
      Accounts.setPassword('0', '12345678');
  }
});
