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
		this.state = {
			info: {
				email: '',
				name: '',
				mobile: '',
				address: '',
			},
			emailError: null,
			nameError: null,
			mobileError: null,
			addressError: null,
		}
  }

	orderDevoice() {
		let token = localStorage.getItem('invoiceId') ? localStorage.getItem('invoiceId') : '';
		let { info, emailError, nameError, mobileError, addressError } = this.state;
		if(!emailError && !nameError && !mobileError && !addressError) {
			info = JSON.stringify(info);
			this.props.orderDevoice(token, info).then(() => {
				console.log("dat hang thanh cong");
				localStorage.removeItem('invoiceId');
			})
		}
	}

  render() {
    let {getInVoice} = this.props.data;
		let { info, emailError, nameError, mobileError, addressError } = this.state;
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
                          <input value={info.email} type="text" className="form-control" onChange={({target}) => {
															let newInfo = info;
															newInfo.email = target.value;
															this.setState({info: newInfo});
														}} onBlur={() => {
															let mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
															if(info.email === '') {
																this.setState({emailError: 'Trường này không được để trống'});
															} else
																	if(!mailReg.test(info.email)) {
																		this.setState({emailError: 'Sai định dạng mail'});
																	} else {
																			this.setState({emailError: null});
																	}
														}}/>
													<span className="help-block">{emailError ? <font style={{color: 'red'}}>{emailError}</font> : null}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Họ và tên</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
                          <input value={info.name} type="text" className="form-control" onChange={({target}) => {
															let newInfo = info;
															newInfo.name = target.value;
															this.setState({info: newInfo});
														}} onBlur={() => {
															let mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
															if(info.name === '') {
																this.setState({nameError: 'Trường này không được để trống'});
															} else {
																	this.setState({nameError: null});
																}
														}}/>
													<span className="help-block">{nameError ? <font style={{color: 'red'}}>{nameError}</font> : null}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Địa chỉ</p>
                      </div>
                      <div className="col-sm-9">
												<div className="from-group">
                          <input value={info.address} type="text" className="form-control" onChange={({target}) => {
															let newInfo = info;
															newInfo.address = target.value;
															this.setState({info: newInfo});
														}} onBlur={() => {
															let mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
															if(info.address === '') {
																this.setState({addressError: 'Trường này không được để trống'});
															} else {
																	this.setState({addressError: null});
																}
														}}/>
													<span className="help-block">{addressError ? <font style={{color: 'red'}}>{addressError}</font> : null}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p>Số điện thoại</p>
                      </div>
                      <div className="col-sm-9">
                        <div className="from-group">
													<input value={info.mobile} type="text" className="form-control" onChange={({target}) => {
															let newInfo = info;
															newInfo.mobile = target.value;
															this.setState({info: newInfo});
														}} onBlur={() => {
															let mobileReg10 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
															let mobileReg11 = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
															if(info.mobile === '') {
																this.setState({mobileError: 'Trường này không được để trống'});
															} else
                                  if(!mobileReg10.test(info.mobile) && !mobileReg11.test(info.mobile)){
                                    this.setState({mobileError: 'Sai định dạng số điện thoại'});
                                  } else {
                                    this.setState({mobileError: null});
                                  }
														}}/>
													<span className="help-block">{mobileError ? <font style={{color: 'red'}}>{mobileError}</font> : null}</span>
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
                <a className="btn-more btn-red" href="#" onClick={this.orderDevoice.bind(this)}>Xác nhận Thanh toán</a>
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

const ORDER = gql `
    mutation orderDevoice($token: String!, $info: String){
        orderDevoice(token: $token, info: $info)
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
}), graphql(ORDER, {
  props: ({mutate}) => ({
    orderDevoice: (token, info) => mutate({variables: {
        token, info
      }})
  })
}),)(Checkout);
