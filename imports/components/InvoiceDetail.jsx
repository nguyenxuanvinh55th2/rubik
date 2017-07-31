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
    return (
      <tr style={{backgroundColor: item.quantity > item.countInStore && '#f0ad4e', border: item.quantity > item.countInStore ? '#eea236' : 'none', color: item.quantity > item.countInStore ? 'white' : '#898989'}}>
          <td style={{textAlign: 'center', padding: 5}}>
              <img style={{with: 60, height: 60}}
                  src={item.stockModel.images && item.stockModel.images[0] ? item.stockModel.images[0].file : '/imgs/logo.png'} />
          </td>
          <td style={{textAlign: 'center'}}>{item.stockModel.name}</td>
          <td style={{textAlign: 'center'}}>{accounting.format(item.stockModel.price) + ' đ'}</td>
          <td >
            {
              item.color.isBasicColor ?
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 5}}>
                  <img className="img-circle" style={{height: 30, width: 30, backgroundColor: item.color.color}}/>
                  <p style={{paddingTop: 5, paddingLeft: 5}}>{item.color.name}</p>
              </div>
              :
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 5}}>
                <img className="img-circle" src={item.color.image && item.color.image.file ? item.color.image.file : ''} style={{height: 30, width: 30}}/>
                <p style={{paddingTop: 5, paddingLeft: 5}}>{item.color.name}</p>
              </div>
            }
          </td>
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
