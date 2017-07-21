import React from 'react'

import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import LeftNews from '../news/LeftNews.jsx';
import ItemProduct from './ItemProduct.jsx';
import __ from 'lodash';
import {Link} from 'react-router';
import accounting from 'accounting';
import Rating from './Rating.jsx';

class AllPoduct extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    if(!this.props.data.stockModels){
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
            {/* <h2 className="text-center">Hướng dẫn chơi</h2> */}
          <div className="main-content container">
            <div className="row">
              <div className="sidebar col-md-3">
                <LeftNews {...this.props} />
              </div>
              <div className="contents col-md-9">
                {
                  __.map(this.props.data.stockModels, (value,idx) => {
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
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
const STOCK_MODEL_QUERY = gql `
    query stockModels($limit: Int){
      stockModels(limit: $limit) {
          _id    name
          images {
            _id file
          }
          price
          votes {
            stars
          }
      }
}`

export default compose(graphql(STOCK_MODEL_QUERY, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),)(AllPoduct);
