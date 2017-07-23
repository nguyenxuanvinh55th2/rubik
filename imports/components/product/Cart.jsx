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
    this.state = {quantity: null};
  }

  removeInvoiceDetail(_id) {
    this.props.removeInvoiceDetail(_id).then(() => {
      this.props.data.refetch();
    });
  }

  render() {
    let {getInVoice} = this.props.data;
    if (getInVoice && getInVoice.invoiceDetails && getInVoice.invoiceDetails.length > 0) {
      return (
        <div className="content">
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
	                            <h4>Danh mục: {item.stockModel.categories ? item.stockModel.categories.toString() : ''}</h4>
	                            <h4>{'Giá: ' + accounting.format(item.stockModel.price - item.stockModel.saleOff) + 'đ'}</h4>
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
                            <td style={{display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
                              <input value={this.state.quantity ? this.state.quantity : item.quantity} style={{width: 75}} type="number" className="form-control" onChange={({target}) => {
                                  this.setState({quantity: parseInt(target.value)});
                                }}
                                onBlur={() => {
                                  let token = localStorage.getItem('invoiceId');
                                  this.props.updateInvoiceDetail(token, item._id, this.state.quantity).then(() => {
                                    this.props.data.refetch();
                                  });
                                }}/></td>
                            <td>{accounting.format(item.stockModel.price - item.stockModel.saleOff) + ' đ'}</td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </table>
                    <hr/>
                    <p>
                      Giá chưa bao gồm phí ship COD(shop sẽ liên hệ với bạn)
                    </p>
                    <p>Thành tiền
                      <span>(Tổng số tiền thanh toán)</span>
                    </p>
                    <p className="text-right rate">{accounting.format(getInVoice.total) + ' đ'}</p>
                    <p className="text-center">
                      <a className="btn-more btn-red" onClick={() => browserHistory.push('/thanh-toan')}>Thanh toán</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
        if(this.props.data.loading) {
          return (
            <div className="item-slider">
    					<div className="loading">
    							<i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
    					</div>
    				</div>
          )
        } else {
            return (
              <div className="column item-slider">
                <p className="text-center">Xin lỗi, bạn chưa thêm hàng vào giỏ, vui lòng chọn sản phẩm để thêm vào giỏ hàng<span style={{color: '#f94949'}}><Link to="/san-pham"> Sản phẩm</Link></span></p>
                <p className="text-center">Bạn có thể theo dõi thông tin của shop trên facebook
                    <span style={{padding: '0 10px'}}>
                      <a href="https://www.facebook.com/rubiknt/" target="blank">
                        <i className="fa fa-facebook" aria-hidden="true" style={{fontSize: 20, color: '#f94949'}}></i>
                      </a>
                  </span>
                  hoặc tại kênh youtube
                   <span style={{padding: '0 10px'}}>
                     <a href="https://www.youtube.com/channel/UCdrq9JuGSPd0aCJH-tAOXZQ" target="blank">
                        <i className="fa fa-youtube-play" aria-hidden="true" style={{fontSize: 20, color: '#f94949'}}></i>
                      </a>
                  </span>
                </p>
              </div>
            )
        }
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
							_id categories
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

const UPDATE_INVOICE_DETAIL = gql `
    mutation updateInvoiceDetail($token: String!, $_id: String!, $number: Int){
        updateInvoiceDetail(token: $token, _id: $_id, number: $number)
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
    }}),
  })
}), graphql(UPDATE_INVOICE_DETAIL, {
  props: ({mutate}) => ({
    updateInvoiceDetail: (token, _id, number) => mutate({variables: {
        token, _id, number
      }})
  })
}))(Cart);
