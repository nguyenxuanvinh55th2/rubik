import React from 'react'
import {Link} from 'react-router';

import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';

import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {getInVoice} = this.props.data;
    if (getInVoice) {
      return (

        <div>
          <Header/>
          <div className="checkout">
            <div className="container">
              <h3>THANH TOÁN</h3>
              <div className="row  row-40">
                <div className="col-sm-7">
                  <div className="info-custom">
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Email</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Họ và tên</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Địa chỉ</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Số điện thoại</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
                          <input type="text" className="form-control"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="right-cart">
                    <h4>Thông tin đơn hàng</h4>
                    <table>
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
													__.map(getInVoice.invoiceDetails, (item, idx) => (
	                          <tr key={idx}>
	                            <td>{item.stockModel.name}</td>
	                            <td>{item.quantity}</td>
	                            <td>{accounting.format(item.stockModel.price)}</td>
	                          </tr>
                        	))
												}
                      </tbody>
                    </table>
                    <hr/>
                    <p>Thành tiền
                      <span>(Tổng số tiền thanh toán)</span>
                    </p>
                    <p className="text-right rate">{accounting.format(getInVoice.total) + ' đ'}</p>

                  </div>
                </div>
              </div>
              <p className="text-center">
                <a className="btn-more btn-red" href="#">Xác nhận Thanh toán</a>
              </p>
            </div>
          </div>
          <Footer/>
        </div>
      )
    } else {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin" style={{
            fontSize: 50
          }}></i>
        </div>
      )
    }
  }
}

const INVOICE_QUERY = gql `
    query getInVoice($token: String!){
        getInVoice(token: $token) {
					_id
					code
					status
					amount
					discount
					total
					createdAt
					shipFee
					invoiceDetails {
						_id
						stockModel {
							_id
							code
	            name
							quantity
							saleOff
							isPromotion
							images {
								_id
								file
							}
	            price
							description
						}
						quantity
						amount
					}
        }
}`

const REMOVE_INVOICE_DETAIL = gql `
    mutation removeInvoiceDetail($_id: String!){
        removeInvoiceDetail(_id: $_id)
}`

export default compose(graphql(INVOICE_QUERY, {
  options: (ownProps) => ({
    variables: {
      token: localStorage.getItem('invoiceId')
        ? localStorage.getItem('invoiceId')
        : ''
    },
    fetchPolicy: 'network-only'
  })
}), graphql(REMOVE_INVOICE_DETAIL, {
  props: ({mutate}) => ({
    removeInvoiceDetail: (_id) => mutate({variables: {
        _id
      }})
  })
}),)(Checkout);
