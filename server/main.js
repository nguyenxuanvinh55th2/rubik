import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import express from 'express';
import cors from 'cors';

__ = require('lodash');
moment = require('moment');

import {createApolloServer} from 'meteor/apollo';
import schema from '/imports/data'


createApolloServer({
  schema,
  graphiql: Meteor.isDevelopment,
  pretty: true,
  configServer: express().use('*', cors())
});
