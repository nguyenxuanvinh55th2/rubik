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
      <tr style={{backgroundColor: item.quantity > item.countInStore && '#f0ad4e', border: item.quantity > item.countInStore ? '#eea236' : 'none', color: item.quantity > item.countInStore ? 'white' : '#898989'}}>
          <td style={{textAlign: 'center', padding: 5}}>
              <img width="75"
                  src={item.stockModel.images && item.stockModel.images[0] ? item.stockModel.images[0].file : '/imgs/logo.png'} />
          </td>
          <td style={{textAlign: 'center'}}>{item.stockModel.name}</td>
          <td style={{textAlign: 'center'}}>{accounting.format(item.stockModel.price) + ' VNĐ'}</td>
          <td style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}><div style={{width: 15, height: 15, backgroundColor: item.color}}></div></td>
          <td style={{textAlign: 'center'}}>
            { item.countInStore }
          </td>
          <td style={{textAlign: 'center'}}>
            { item.quantity }
          </td>
          <td style={{textAlign: 'center'}}>
            { accounting.format(item.amount) + 'đ' }
          </td>
      </tr>
    )
  }
}

export default InvoiceDetail;
