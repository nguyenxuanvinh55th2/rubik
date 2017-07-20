import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import accounting from 'accounting';

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item } = this.props;
    console.log("message", item);
    return (
      <div style={{padding: 15}} className={"box-cart"}>
        <div className="row">
          <div className="col-sm-3">
            <div style={{width: '100%', margin: 0}}>
              <img src={item.stockModel.images[0]
                ? item.stockModel.images[0].file
                : ''} alt=""/>
            </div>
          </div>
          <div className="col-sm-9">
            <h4>{item.stockModel.name}</h4>
            <h4>Danh mục: Rubik 2x2x2</h4>
            <h4>{'Giá: ' + accounting.format(item.stockModel.price) + 'đ'}</h4>
            <h4>{'Số  lượng: ' + item.quantity}</h4>
            <h4>{'Tổng tiền: ' + accounting.format(item.amount) + 'đ'}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceDetail;
