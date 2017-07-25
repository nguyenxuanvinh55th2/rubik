import React from 'react'

import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import Sliders from './Slider.jsx'
import SliderNew from './SliderNews.jsx'
import Product from '../product/Product.jsx'
import {Link} from 'react-router';
import {showProduct, removeMenu } from '../../javascript/header.js'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    showProduct();
  }
  componentWillMount(){
		if(this.props.changeHeader){
			this.props.changeHeader('home');
		}
	}
  render() {
    return (
      <div>
        <Sliders/>/
        <div className="sec-cate">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="item bg" style={{
                  backgroundImage: "url('/imgs/spinner.jpg')"
                }}>
                  <p>
                    <Link to={'/san-pham/loai-hang/100'} className="btn btn-cate">Spinner</Link>
                  </p>
                </div>
                <div className="item bg" style={{
                  backgroundImage: "url('/imgs/rubik.jpg')"
                }}>
                  <p>
                    <Link to={'/san-pham/loai-hang/99'} className="btn btn-cate">Rubik</Link>
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="item-center bg" style={{
                  backgroundImage: "url('/imgs/tutorial.jpg')"
                }}>
                  <p>
                    <Link to={'/huong-dan-choi/2'} className="btn btn-cate">Hướng dẫn chơi</Link>
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="item bg" style={{
                  backgroundImage: "url('/imgs/spinner.jpg')"
                }}>
                  <p>
                    <Link to={'/san-pham'} className="btn btn-cate">Sản phẩm mới</Link>
                  </p>
                </div>
                <div className="item bg" style={{
                  backgroundImage: "url('/imgs/rubik.jpg')"
                }}>
                  <p>
                    <Link to={'/san-pham/loai-hang/101'} className="btn btn-cate">Phụ kiện</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-product">
          <div className="container">
            <h2 className="text-center">SẢN PHẨM MỚI</h2>
            <div className="two-space"></div>
            <div className="row">
              {< Product {...this.props} stockModels = {
                this.props.data.stockModels
              } />
            }
            </div>
            <p className="text-center">
              <Link to={'/san-pham'} className="btn-more">Xem thêm</Link>
            </p>
          </div>
        </div>
        <div className="sec-product">
          <div className="container">
            <h2 className="text-center">TOP SẢN PHẨM BÁN CHẠY</h2>
            <div className="two-space"></div>
            <div className="row">
              {< Product {...this.props} stockModels = {
                this.props.data.getTopStockModel
              } />
            }
            </div>
            <p className="text-center">
              <Link to={'/san-pham'} className="btn-more">Xem thêm</Link>
            </p>
          </div>
        </div>
        <SliderNew {...this.props}/>
      </div>
    )
  }
}

const STOCK_MODEL_QUERY = gql `
    query stockModels($limit: Int){
      stockModels(limit: $limit) {
          _id
          name quantity
					images {
						_id
						file
					}
          price isPromotion saleOff
          votes {
            stars
          }
      }
      getTopStockModel(limit: $limit) {
          _id
          name quantity
					images {
						_id
						file
					}
          price isPromotion saleOff
          votes {
            stars
          }
      }
}`

export default compose(graphql(STOCK_MODEL_QUERY, {
  options: () => ({
    variables: {
      limit: 4
    },
    fetchPolicy: 'network-only'
  })
}),)(Home);
