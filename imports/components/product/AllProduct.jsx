import React from 'react'

import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import LeftNews from '../news/LeftNews.jsx';
import ItemProduct from './ItemProduct.jsx';
import __ from 'lodash';
import {Link} from 'react-router';
import accounting from 'accounting';
import Rating from './Rating.jsx';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

export default class AllPoduct extends React.Component {
  constructor(props) {
    super(props)
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

                {
                  __.map(this.props.findProduct.stockModels, (value,idx) => {
                    return(
                      <div key={idx} className="col-sm-4 col-xs-12 col-md-3">
                        <div className="item-product">
                          <div className="box-item">
                            <img src={value.images [0] ? value.images[0].file : 'http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png'} alt=""/>
                            <Link to={`/productDetail/${value._id}`} className="hover-product"></Link>
                            <div className="chart">
                              <Link to={'#'}>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                              </Link>
                            </div>
                            <div className="link-detail">
                              <Link to={`/productDetail/${value._id}`} className="btn btn-cate">Xem chi tiết</Link>
                            </div>
                          </div>
                          <div className="info-product">
                            <h4>
                              <Link to={`/productDetail/${value._id}`}>{value.name}</Link>
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
                <p className="text-center">
                  <Link onClick={() => {
                    this.props.findProduct.loadMoreEntries();
                  }} className="btn-more">Xem thêm</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
