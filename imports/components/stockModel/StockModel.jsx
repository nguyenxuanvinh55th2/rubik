import React from 'react';
import { browserHistory } from 'react-router';
export default class StockModel extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
        stock modle
        <button type="button" className="btn btn-primary" onClick={() => browserHistory.push('/stockModelForm')}>Tạo mới</button>
      </div>
    )
  }
}
