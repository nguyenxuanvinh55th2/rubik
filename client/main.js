import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import store from '../imports/store';
import {client} from '../imports/apollo-client';

import {renderRoutes} from '../imports/routes.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/ag-grid/dist/styles/ag-grid.css';
import '/node_modules/ag-grid/dist/styles/theme-fresh.css';
import '../imports/stylesheet/custom.scss';
import '../imports/stylesheet/footer.scss';
import '../imports/stylesheet/header.scss';
import '../imports/stylesheet/home.scss';
import '../imports/stylesheet/product.scss';
import '../imports/stylesheet/slider.scss';
import '../imports/stylesheet/ag-pattern.css';
import '../imports/stylesheet/manager.scss';
import '../imports/stylesheet/news.scss';
import '../imports/stylesheet/react-select.css';
import '../imports/stylesheet/react-tab.css';
import '../imports/stylesheet/quill.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
Meteor.startup(() => {
  render(
    <ApolloProvider store={store} client={client}>
      <MuiThemeProvider>
        {renderRoutes()}
      </MuiThemeProvider>
    </ApolloProvider>
    , document.getElementById('render-target'));
});
