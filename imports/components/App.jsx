import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import __ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';

import * as actionCreator from "../actions/actionCreator";

import '../stylesheet/material.css';

function mapStateToProps(state){
  return {
    users: state.users,
    notification: state.notification,
    header: state.header
  }
}

function mapDispathToProps(dispatch) {
  return bindActionCreators(actionCreator, dispatch);
}

class Main extends Component {
  constructor(props){
    super(props);
  }
  componentWillUpdate(nextProps){
  let {notification} = nextProps;
  if(notification.fetchData){
    this._notificationSystem.addNotification({
     message: notification.message,
     level: notification.level,
     position: 'bl'
   });
   this.props.addNotificationMute({fetchData: false});
  }
}
componentDidMount() {
  this._notificationSystem = this.refs.notificationSystemRoot;
}
  render() {
    let childProps = __.cloneDeep(this.props);
     delete childProps.children;
    return (
      <div>
        {
          React.cloneElement(this.props.children, childProps)
        }
        <NotificationSystem ref="notificationSystemRoot" style={{NotificationItem: {DefaultStyle: {margin: '10px', minHeight: 50, padding: '10px'}}}} />
      </div>
    );
  }
}
const App = connect (mapStateToProps,mapDispathToProps)(Main);

export default App;
