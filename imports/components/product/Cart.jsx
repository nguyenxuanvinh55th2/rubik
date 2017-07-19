import React from 'react'

import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';

import {Link, browserHistory} from 'react-router';
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'

import Rating from './Rating.jsx';

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  removeInvoiceDetail(_id) {
    this.props.removeInvoiceDetail(_id).then(() => {
      this.props.data.refetch();
    });
  }

  render() {
    let {getInVoice} = this.props.data;
    if (getInVoice) {
      return (

        <div>
          {/* <Header/> */}
          <div className="sec-cart">
            <div className="container">
              <h3 className="text-center">GIỎ HÀNG CỦA BẠN</h3>
              <div className="row">
                <div className="col-sm-8">
                  <div className="left-cart">
                    {
											__.map(getInVoice.invoiceDetails, (item, idx) => (
	                      <div key={idx} className={"box-cart"}>
	                        <div className="row">
	                          <div className="col-sm-3">
	                            <div className="image">
	                              <img src={item.stockModel.images[0]
	                                ? item.stockModel.images[0].file
	                                : ''} alt=""/>
	                            </div>
	                          </div>
	                          <div className="col-sm-9">
	                            <h4>{item.stockModel.name}</h4>
	                            <h4>Danh mục: Rubik 2x2x2</h4>
	                            <h4>{'Giá: ' + accounting.format(item.stockModel.price) + 'đ'}</h4>
	                            <div className="group-star">
                                <Rating {...this.props} iconSize={20} factor={'10%'} rating = {item.votes} allowEdit = {false} showStarText = {false}/>
	                            </div>
	                            <span className="close">
	                              <i className="fa fa-times" aria-hidden="true" onClick={this.removeInvoiceDetail.bind(this, item._id)}></i>
	                            </span>
	                          </div>
	                        </div>
	                      </div>
                    	))
										}
                  </div>
                </div>
                <div className="col-sm-4">
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
                        {__.map(getInVoice.invoiceDetails, (item, idx) => (
                          <tr key={idx}>
                            <td>{item.stockModel.name}</td>
                            <td>{item.quantity}</td>
                            <td>{accounting.format(item.stockModel.price) + ' đ'}</td>
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
                    <p className="text-center">
                      <a className="btn-more btn-red" href="#" onClick={() => browserHistory.push('/checkout')}>Thanh toán</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer/> */}
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
            votes {
              stars
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
}),)(Cart);
