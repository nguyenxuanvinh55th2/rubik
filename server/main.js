import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import express from 'express';
import cors from 'cors';
Future = Npm.require('fibers/future');
__ = require('lodash');
moment = require('moment');

import { EJSON } from 'meteor/ejson';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

// import bodyParser from 'body-parser';
bodyParser = require("body-parser");
import { createServer, http } from 'http';

import {createApolloServer} from 'meteor/apollo';
import schema from '/imports/data';
process.env.MAIL_URL="smtp://noreply.lokatech@gmail.com:defa4ltlokatech@smtp.gmail.com:587/";
// Email.send({
//     from: Meteor.settings.email,
//     bcc: "nguyenxuanvinh55th2@gmail.com",
//     replyTo: Meteor.settings.email || undefined,
//     subject: 'Báo cáo xuất kho',
//     text: "helo vinh nguyen"
// }, (err) => {
//     if (err) {
//       console.log(err);
//     }
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
