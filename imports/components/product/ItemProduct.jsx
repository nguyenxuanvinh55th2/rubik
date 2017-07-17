import React from 'react'
import {Link} from 'react-router';
import accounting from 'accounting';

import Rating from './Rating.jsx';

export default class ItemProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-3 col-xs-6">
        <div className="item-product">
          <div className="box-item">
            <img src={this.props.value.image} alt=""/>
            <Link to={'/productDetail/' + this.props.value._id} className="hover-product"></Link>
            <div className="chart">
              <Link to={'#'}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="link-detail">
              <Link to={'/productDetail/' + this.props.value._id} className="btn btn-cate">Xem chi tiết</Link>
            </div>
          </div>
          <div className="info-product">
            <h4>
              <Link to={'/productDetail/' + this.props.value._id}>{this.props.value.name}</Link>
            </h4>
            <div className="star">
              <div className="group-star">
                <Rating {...this.props} iconSize={20} factor={'10%'} rating = {this.props.value.votes} allowEdit = {false} showStarText = {false}/>
              </div>
            </div>
            <p>{accounting.format(this.props.value.price)}
              đ</p>
          </div>
        </div>
      </div>
    )
  }
}
