import React from 'react';
export default class StockModel extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div>
        stock modle
        <button type="button" className="btn btn-primary">Tạo mới</button>
      </div>
    )
  }
}
