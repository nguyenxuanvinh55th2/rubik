import React from 'react';
import { browserHistory } from 'react-router';
import __ from 'lodash';
import store from '../../store.js'
import HeaderManager from './HeaderManager.jsx';
export default class Manager extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let childProps = __.cloneDeep(this.props);
    delete childProps.children;
    return (
      <div>
        <HeaderManager {...this.props} />
        {React.cloneElement(this.props.children, childProps)}
      </div>
    )
  }
}
