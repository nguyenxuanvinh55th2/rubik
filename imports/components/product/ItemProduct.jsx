import React from 'react'
import {Link, browserHistory} from 'react-router';

import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';

import Rating from './Rating.jsx';

class ItemProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  codeBill(number) {
    var randomChar = '',
      string = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    for (var i = 0; i < number; i++) {
      randomChar += string.substr(Math.floor(Math.random() * string.length), 1);
    }
    return randomChar;
  }

  addToCart(linkTo) {
    let token = localStorage.getItem('invoiceId');
    let stockModelById = __.cloneDeep(this.props.value);
    if (!token || token === '') {
      token = 'DH' +
        '-' + this.codeBill(4);
      localStorage.setItem('invoiceId', token);
    }
    let invoice = {
      _id: token,
      code: token,
      status: 0,
      customer: {},
      amount: 0,
      total: 0,
      createdAt: moment().valueOf(),
      shipFee: 0
    }
    let imageId = stockModelById.images.map(item => item._id);
    delete stockModelById['images'];
    stockModelById['images'] = imageId;
    let detail = {
      stockModel: stockModelById,
      quantity: 1,
      color: stockModelById.colors[0] && stockModelById.colors[0],
      amount: stockModelById.price - stockModelById.saleOff,
      invoice: {
        _id: token,
        code: token
      },
      createdAt: moment().valueOf()
    }
    invoice = JSON.stringify(invoice);
    detail = JSON.stringify(detail);
    this.props.insertInvoice(token, invoice).then(() => {
      this.props.insertInvoiceDetail(token, detail).then(() => {
        browserHistory.push(linkTo);
        this.props.addNotificationMute({fetchData: true, message: 'Sản phẩm ' + stockModelById.name + ' đã được thêm vào giỏ hàng của bạn', level:'success'});
      });
    })
  }

  render() {
    return (
      <div className="col-sm-3 col-xs-6">
        <div className="item-product">
          <div className="box-item">
            <img src={this.props.value.image} alt=""/>
            <Link to={'/chi-tiet-san-pham/' + this.props.value._id} className="hover-product"></Link>
            {
              this.props.value.quantity && this.props.value.quantity > 0 &&
              <div className="chart">
                <Link>
                  <i className="fa fa-shopping-cart" aria-hidden="true" onClick={this.addToCart.bind(this, '/gio-hang')}></i>
                </Link>
              </div>
            }
            <div className="link-detail">
              <Link to={'/chi-tiet-san-pham/' + this.props.value._id} className="btn btn-cate">Xem chi tiết</Link>
            </div>
          </div>
          <div className="info-product">
            <h4>
              <Link to={'/chi-tiet-san-pham/' + this.props.value._id}>{this.props.value.name}</Link>
            </h4>
            <div className="star">
              <div className="group-star">
                <Rating {...this.props} iconSize={20} factor={'10%'} rating = {this.props.value.votes} allowEdit = {false} showStarText = {false}/>
              </div>
            </div>
            {
              this.props.value.isPromotion ?
              <p>
                <span className="rate-cu">{accounting.formatNumber(this.props.value.price)}đ</span> <span>{accounting.formatNumber(this.props.value.price - this.props.value.saleOff)}đ</span>
              </p>
              :
              <p>
                {
                  accounting.formatNumber(this.props.value.price)
                }
                đ
              </p>
            }
          </div>
        </div>
      </div>
    )
  }
}

const INSERT_INVOICE = gql `
    mutation insertInvoice($token: String!, $info: String){
        insertInvoice(token: $token, info: $info)
}`

const INSERT_INVOICE_DETAIL = gql `
    mutation insertInvoiceDetail($token: String!, $info: String){
        insertInvoiceDetail(token: $token, info: $info)
}`

export default compose(
  graphql(INSERT_INVOICE, {
    props: ({mutate}) => ({
      insertInvoice: (token, info) => mutate({
        variables: {
          token,
          info
        }
      })
    })
  }),
  graphql(INSERT_INVOICE_DETAIL, {
    props: ({mutate}) => ({
      insertInvoiceDetail: (token, info) => mutate({
        variables: {
          token,
          info
        }
      })
    })
  })
)(ItemProduct);
