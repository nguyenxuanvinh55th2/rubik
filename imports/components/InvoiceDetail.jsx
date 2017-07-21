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
      <tr style={{borderBottom: '1px solid #8f8f8d'}}>
          <td style={{textAlign: 'left'}}>
              <img width="105"
                  src={item.stockModel.images && item.stockModel.images[0] ? item.stockModel.images[0].file : 'https://i1117.photobucket.com/albums/k593/ngocsang1501/st4Sp6Aw_zpsdaqtubup.jpg'} />
          </td>
          <td style={{textAlign: 'center'}}>{item.stockModel.name}</td>
          <td style={{textAlign: 'center'}}>{accounting.format(item.stockModel.price) + ' VNĐ'}</td>
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
