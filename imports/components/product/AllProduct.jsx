import React from 'react'

import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import LeftNews from '../news/LeftNews.jsx';
import ItemProduct from './ItemProduct.jsx';
import __ from 'lodash';
import {Link, browserHistory} from 'react-router';
import accounting from 'accounting';
import Rating from './Rating.jsx';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

export default class AllPoduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }
  render(){
    if(!this.props.findProduct.stockModels){
      return(
        <div className="item-slider">
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
          </div>
        </div>
      )
    }
    else {
      return (
        <div id="news">
          <div className="main-content container">
            <div className="row">
              <div className="sidebar col-md-3">
                <LeftNews {...this.props} />
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
                        let image = item.images [0] ? item.images[0].file : 'http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png';
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

                            <div key={idx} className="product-iphone col-sm-4 col-xs-6 col-md-3">
                              <div className="item-product">
                                <div className="box-item">
                                  <img src={value.images [0] ? value.images[0].file : 'http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png'} alt=""/>
                                  <Link to={`/chi-tiet-san-pham/${value._id}`} className="hover-product"></Link>
                                  <div className="chart">
                                    <Link to={'#'}>
                                      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    </Link>
                                  </div>
                                  <div className="link-detail">
                                    <Link to={`/chi-tiet-san-pham/${value._id}`} className="btn btn-cate">Xem chi tiết</Link>
                                  </div>
                                </div>
                                <div className="info-product">
                                  <h4>
                                    <Link to={`/chi-tiet-san-pham/${value._id}`}>{value.name}</Link>
                                  </h4>
                                  <div className="star">
                                    <div className="group-star">
                                      <Rating {...this.props} iconSize={20} factor={'10%'} rating = {value.votes} allowEdit = {false} showStarText = {false}/>
                                    </div>
                                  </div>
                                  <p>{accounting.format(value.price)}
                                    đ</p>
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
        _id name code categories
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