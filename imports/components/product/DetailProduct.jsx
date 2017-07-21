import React from 'react'

import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

import {Link, browserHistory} from 'react-router';
import SliderDetails from '../home/SliderDetail.jsx'
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
import {slideChitiet} from '../../javascript/header.js'

import Rating from "./Rating.jsx";

class Comment extends React.Component {
  render() {
    let { showBoder, rate, idx } = this.props;
    return (
      <div style={{width: '100%', borderBottom: showBoder ? '1px solid gray' : null, paddingTop: 20}}>
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',}}>
          <div style={{width: 200}}>
            <Rating key={idx+rate.stars} {...this.props} iconSize={30} rating = {this.props.rating} allowEdit = {false} showStarText = {false} rateCount = {rate.stars}/>
          </div>
        </div>
        <div style={{paddingTop: 10, width: '100%'}}>
          <label style={{fontSize: 14}}>{'Theo' + ' ' + rate.name}&emsp;</label>
        </div>
        <div style={{width: '100%', color: '#888888', fontSize: 16}}>
          { rate.comment }
        </div>
        <div style={{paddingTop: 10, paddingBottom: 10, textAlign: 'right', fontSize: 16, color: '#888888'}}>
          {moment(rate.createdAt).format('DD/MM/YYYY')}
        </div>
      </div>
    )
  }
}

class DetailProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      pageCount: 0,
      updatePage: true,
      rate: null,
      comment: '',
      name: '',
      email: ''
    };
    this.itemPerPage = 2;
  }

  componentDidMount() {
    slideChitiet();
  }

  commentHandle() {
    let { data } = this.props;
    let token = localStorage.getItem('Meteor.loginToken');
    if(this.state.rate && this.state.rate > 0 && this.state.comment !== '' && this.state.email !== '') {
      let votes = JSON.stringify({
        stars: this.state.rate,
        comment: this.state.comment,
        name: this.state.name,
        email: this.state.email
      });
      this.props.ratingStockModel(token, data.stockModelById._id, votes).then(() => {
        this.props.data.refetch();
        this.props.addNotificationMute({fetchData: true, message: 'Đánh giá thành công', level:'success'});
        this.setState({updatePage: true});
        this.setState({rate: 0, comment: '', name: '', email: ''});
      })
      .catch((error) => {
      });
    } else {
        this.props.addNotificationMute({fetchData: true, message: 'Bạn cần điền đủ các thông tin', level:'warning'});
    }
  }

  componentWillUpdate(nextProps, nexState) {
    if(nextProps.data.stockModelById) {
      let { votes } = nextProps.data.stockModelById;
      let { updatePage } = this.state;
      if(nextProps.data.stockModelById.votes && updatePage) {
        let page = [];
        for(let i = 0; i < this.itemPerPage; i++) {
          if(votes[i]) {
            page.push(votes[i]);
          }
        }
        let pageCount = Math.ceil(votes.length / this.itemPerPage);
        this.setState({page, pageCount, updatePage: false});
      }
    }
  }

  handlePageClick(data){
    let {votes} = this.props.data.stockModelById;
    let selected = data.selected;
    let offset = Math.ceil(selected * this.itemPerPage);

    let page = [];
    for(let i = offset; i < offset + this.itemPerPage; i ++) {
      if(votes[i]) {
        page.push(votes[i]);
      }
    }
    this.setState({page});
  }

  ratingHandle(rate) {
    this.setState({rate})
  }

  componentDidUpdate() {
    let {stockModelById} = this.props.data;
    if (stockModelById) {
      if (stockModelById.description) {
        setTimeout(() => {
          let description = document.getElementById('mota');
          if (description) {
            description.innerHTML = stockModelById.description;
          }
        }, 500)
      }
    }
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
    let stockModelById = __.cloneDeep(this.props.data.stockModelById);
    if (!token || token === '') {
      token = 'DH' +
        '-' + this.codeBill(4);
      localStorage.setItem('invoiceId', token);
    }
    console.log("stockModelById ", stockModelById);
    let invoice = {
      _id: token,
      code: token,
      status: 0,
      customer: {},
      amount: 0,
      discount: 100,
      total: 0,
      createdAt: moment().valueOf(),
      shipFee: 0
    }
    let imageId = stockModelById.images.map(item => item._id);
    delete stockModelById['images'];
    stockModelById['images'] = imageId;
    console.log("stockModelById ", stockModelById);
    let detail = {
      stockModel: stockModelById,
      quantity: this.state.number,
      amount: this.state.number * stockModelById.price - this.state.number * stockModelById.price * stockModelById.saleOff,
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
    let {stockModelById} = this.props.data;
    let { page, pageCount } = this.state;
    if (stockModelById) {
      let images = [];
      __.forEach(stockModelById.images, (item, idx) => {
        if (idx < 3) {
          images.push(item.file);
        }
      });
      return (

        <div>
          {/* <Header/> */}
          <div className="product-detail">
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <div className="danhmuc-sp">
                    <h3>DANH MỤC SẢN PHẨM</h3>
                    <h4>
                      <a role="button" data-toggle="collapse" href="#collapsePlus1" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">RUBIK</a>
                    </h4>
                    <div className="more collapse" id="collapsePlus1">
                      <p>Comic Spinner</p>
                      <p>Fidget Cube</p>
                    </div>
                    <h4>
                      <a role="button" data-toggle="collapse" href="#collapsePlus2" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">Spiner</a>
                    </h4>
                    <div className="more collapse" id="collapsePlus2">
                      <p>Comic Spinner</p>
                      <p>Fidget Cube</p>
                    </div>
                    <h4>
                      <a role="button" data-toggle="collapse" href="#collapsePlus3" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">Các phụ kiện khác</a>
                    </h4>
                    <div className="more collapse" id="collapsePlus3">
                      <p>Comic Spinner</p>
                      <p>Fidget Cube</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-sm-7">
                      <div className="slider-anh">
                        <div className="show-anh">
                          {images.map((item, idx) => (
                            <div key={idx} className={idx === 0
                              ? "item" + idx + " item active"
                              : "item" + idx + " item"}>
                              <img src={item} alt=""/>
                            </div>
                          ))
}
                        </div>
                        <div className="click-anh">
                          <ul>
                            {images.map((item, idx) => (
                              <li key={idx} data={idx}>
                                <img src={item} alt=""/>
                              </li>
                            ))
}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-5">
                      <div className="thongtin-sp">
                        <h3>{stockModelById.name.toUpperCase()}</h3>
                        <h4 className="ma">{'Mã: ' + stockModelById.code}</h4>
                        <h4 className="gia">{'Giá ' + accounting.format(stockModelById.price)}</h4>
                        <h4 className="trangthai">{stockModelById.quantity > 0
                            ? 'Còn hàng'
                            : 'Hết hàng'}</h4>
                        <h4 className="dmuc">{'Danh mục: ' + (stockModelById.categories ? stockModelById.categories.toString() : '')}</h4>
                        <h4 className="dmuc" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                          <font style={{whiteSpace: 'nowrap', marginTop: 15}}>
                            Số  lượng:
                          </font>
                          <div style={{width: 10}}>
                          </div>
                          <input style={{width: 100, textAlign: 'center'}} value={this.state.number} onChange={({target}) => this.setState({number: parseInt(target.value)})
                          } type="number" min="1" className="form-control"/>
                        </h4>
                        <p>
                          <a className="btn-more btn-red" href="#" onClick={this.addToCart.bind(this, '/checkout')}>MUA HÀNG</a>
                        </p>
                        <div className="one-space"></div>
                        <p>
                          <a className="btn-more" href="#" onClick={this.addToCart.bind(this, '/shoppingCart')}>THÊM VÀO GIỎ HÀNG</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sec-tab">
                    <ul className="group-tab" role="tablist">
                      <li role="presentation" className="active">
                        <a href="#mota" aria-controls="mota" role="tab" data-toggle="tab">Mô tả</a>
                      </li>
                      <li role="presentation">
                        <a href="#danhgia" aria-controls="danhgia" role="tab" data-toggle="tab">Đánh giá</a>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div role="tabpanel" className="tab-pane active" id="mota"></div>
                      <div role="tabpanel" className="tab-pane" id="danhgia">
                        <div className="binhluan">
                          <Rating key="rating" {...this.props} iconSize={30} factor={'100%'} rating = {stockModelById.votes} allowEdit = {true} showStarText = {true} ratingHandle={this.ratingHandle.bind(this)}/>
                          <h4>Bình luận</h4>
                          <div className="col-sm-12" style={{marginLeft: 50, paddingLeft: 0}}>
                            <div className="col-sm-10" style={{paddingLeft: 0}}>
                              {
                                page ?
                                page.map((item, idx) => (
                                  <Comment {...this.props} key={idx} rate={item} rating={stockModelById.votes} showBoder={((idx + 1) % this.itemPerPage) === 0 ? false : true} idx={idx}/>
                                )) : null
                              }
                            </div>
                            <div className="col-sm-10" style={{textAlign: 'center'}}>
                              {
                                pageCount > 0 ?
                                <ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick.bind(this)}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} /> : null
                              }
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Nhập tên" style={{width: '50%'}} value={this.state.name} onChange={({target}) => {
                              this.setState({name: target.value});
                            }}/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Nhập địa chỉ email" style={{width: '50%'}} value={this.state.email} onChange={({target}) => {
                              this.setState({email: target.value});
                            }}/>
                        </div>
                        <div className="form-group">
                          <textarea rows="4" className="form-control" placeholder="Nhập bình luận" value={this.state.comment} onChange={({target}) => {
                              this.setState({comment: target.value});
                            }}></textarea >
                        </div>
                        <div className="form-group" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                          <div className="one-space"></div>
                          <a className="btn-more" href="#nhanxet" aria-controls="nhanxet" role="tab" data-toggle="tab" onClick={this.commentHandle.bind(this)}>Nhận xét</a>
                        </div>
                      </div>
                    </div>
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

const STOCK_MODEL_QUERY = gql `
    query stockModelById($_id: String!){
        stockModelById(_id: $_id) {
            _id
						code
            name
						quantity
						saleOff
            categories
						isPromotion
						images {
							_id
							file
						}
            votes {
              stars
              name
              email
              comment
            }
            price
						description
        }
}`

const INSERT_INVOICE = gql `
    mutation insertInvoice($token: String!, $info: String){
        insertInvoice(token: $token, info: $info)
}`

const RATING_STOCK_MODEL = gql `
    mutation ratingStockModel($token: String!, $_id: String, $info: String){
        ratingStockModel(token: $token, _id: $_id, info: $info)
}`

const INSERT_INVOICE_DETAIL = gql `
    mutation insertInvoiceDetail($token: String!, $info: String){
        insertInvoiceDetail(token: $token, info: $info)
}`

export default compose(graphql(STOCK_MODEL_QUERY, {
  options: (ownProps) => ({
    variables: {
      _id: ownProps.params.id
    },
    fetchPolicy: 'network-only'
  })
}), graphql(INSERT_INVOICE, {
  props: ({mutate}) => ({
    insertInvoice: (token, info) => mutate({
      variables: {
        token,
        info
      }
    })
  })
}), graphql(INSERT_INVOICE_DETAIL, {
  props: ({mutate}) => ({
    insertInvoiceDetail: (token, info) => mutate({
      variables: {
        token,
        info
      }
    })
  })
}), graphql(RATING_STOCK_MODEL, {
  props: ({mutate}) => ({
    ratingStockModel: (token, _id, info) => mutate({
      variables: {
        token,
        _id,
        info
      }
    })
  })
}))(DetailProduct);
