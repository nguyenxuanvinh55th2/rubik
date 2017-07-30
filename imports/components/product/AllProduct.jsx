import React from 'react'

import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import LeftNews from '../news/LeftNews.jsx';
import ItemProduct from './ItemProduct.jsx';
import __ from 'lodash';
import {Link, browserHistory} from 'react-router';
import accounting from 'accounting';
import moment from 'moment';
import Rating from './Rating.jsx';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import LeftProduct from './LeftProduct.jsx';
export default class AllPoduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
    }
  }
  componentWillMount(){
		if(this.props.changeHeader){
			this.props.changeHeader('product');
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

  addToCart(linkTo, stockModel) {
    let token = localStorage.getItem('invoiceId');
    let stockModelById = __.cloneDeep(stockModel);
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
  render(){
    if(!this.props.findProduct.stockModels){
      return(
        <div className="content">
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="content" id="news">
          <div className="main-content container">
            <div className="row">
              <div className="sidebar col-md-3" style={{paddingRight: 50}}>
                <LeftProduct {...this.props} />
              </div>
              <div className="contents col-md-9">
                <div className="row search-custormer">
                  <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1">
                    <AutocompleteStockModel
                      ref={ref=>this.comboboxStock=ref}
                      valueKey="stringValueParse"
                      labelKey="stringValueParse"
                      cache={false}
                      searchValue={this.state.searchValue || ''}
                      placeholder="Nhập mã hàng, tên hàng, chủng loại....."
                      optionRenderer={(item) => {
                        let image = item.images [0] ? item.images[0].file : '/imgs/logo.png';
                        return (
                          <div className="row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', margin: '0px 15px'}}>
                            <div>
                              <img src={image} style={{height: 50, width: 50}} />
                            </div>
                            <div style={{marginLeft: 30}}>
                              <p>
                                  {item.name}
                              </p>
                              <p>
                                {item.stockType.name} - {item.categories.toString()}
                              </p>
                            </div>
                          </div>
                        )
                      }}
                      onInputChange={(searchText) => {
                        this.setState({searchValue: searchText});
                      }}
                      onChange={(st) => {
                        if(st && st._id){
                          browserHistory.push(`/chi-tiet-san-pham/${st._id}`)
                        }
                      }}
                    />
                  </div>
                </div>
                {
                  this.props.findProduct.stockModels.length ?
                  <div>
                    <div className="row">
                      {
                        __.map(this.props.findProduct.stockModels, (value,idx) => {
                          return(
                            <div key={idx} className="product-iphone col-sm-4 col-xs-6">
                              <div className="item-product">
                                <div className="box-item">
                                  <img src={value.images [0] ? value.images[0].file : '/imgs/logo.png'} alt=""/>
                                  <Link to={`/chi-tiet-san-pham/${value._id}`} className="hover-product"></Link>
                                  {
                                    value.quantity && value.quantity > 0 &&
                                    <div className="chart">
                                      <Link>
                                        <i  onClick={this.addToCart.bind(this, '/gio-hang', value)} className="fa fa-shopping-cart" aria-hidden="true"></i>
                                      </Link>
                                    </div>
                                  }
                                  <div className="link-detail">
                                    <Link to={`/chi-tiet-san-pham/${value._id}`} className="btn btn-cate">Xem chi tiết</Link>
                                  </div>
                                </div>
                                <div className="info-product">
                                  <h4>
                                    <Link to={`/chi-tiet-san-pham/${value._id}`}>{value.name}</Link>
                                  </h4>
                                  <Rating {...this.props} isSpec={true} iconSize={20} factor={'10%'} rating = {value.votes} allowEdit = {false} showStarText = {false}/>
                                  {
                                    value.isPromotion ?
                                    <p>
                                      <span className="rate-cu">{accounting.formatNumber(value.price)}đ</span> <span>{accounting.formatNumber(value.price - value.saleOff)}đ</span>
                                    </p>
                                    :
                                    <p>
                                      {
                                        accounting.formatNumber(value.price)
                                      }
                                      đ
                                    </p>
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <p className="text-center">
                      <Link onClick={() => {
                        this.props.findProduct.loadMoreEntries();
                      }} className="btn-more">Xem thêm</Link>
                    </p>
                  </div>
                  :
                  <div className="column">
        						<p className="text-center">Xin lỗi, không tìm thấy sản phẩm bạn yêu cầu, vui lòng liên hệ với shop để được hỗ trợ.</p>
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
                }

              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const SEARCH_STOCKMODEL = gql`
    query getAllStockModelSearch($keyCode:String) {
      getAllStockModelSearch(keyCode: $keyCode){
        _id name code categories quantity isPromotion saleOff colors weight
        stockType {
          _id name
        }
        images {
          _id
          file
        }
      }
    }
`;
const AutocompleteStockModel = graphql(SEARCH_STOCKMODEL, {
    withRef: true,
    options: ({searchValue}) => ({ variables: {keyCode: searchValue},   fetchPolicy: 'network-only' }),
    props: ({ ownProps, data: { loading, getAllStockModelSearch, refetch } }) => ({
        options: getAllStockModelSearch ? __.map(__.cloneDeep(getAllStockModelSearch), (stockModel) => {
          stockModel.stringValueParse = stockModel.code + stockModel.name + stockModel.categories + stockModel.stockType.name;
          return stockModel
        }) : []
    })
})(Select);
