import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
class SliderNew extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(!this.props.data.posts){
      return (
        <div className="item-slider">
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
          </div>
        </div>
      )
    }
    else {
      var settings = {
        arrows: true,
        dots: true,
        speed: 500,
        infinite: false,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: true
            }
          }
        ]
      };
      return (
        <div>
          {
            this.props.data.posts.length ?
            <Slider {...settings}>
                {
                  __.map(this.props.data.posts,(post, idx) => {
                    return (
                      <div key={idx} className="item-slider-new bg" style={{
                        backgroundImage: "url('/imgs/news.jpg')"
                      }}>
                        <div className="container">
                          <h2 className="text-center">TIN TỨC NỔI BẬT</h2>
                          <div className="row">
                            <div className="col-sm-5">
                              <div className="image">
                                <img src={post.image.file ? post.image.file : '/imgs/news.jpg'} alt=""/>
                              </div>
                            </div>
                            <div className="col-sm-7">
                              <h3>{post.title}</h3>
                              <p>
                                {post.description}
                              </p>
                              <p className="text-right">
                                <Link  to={`/chi-tiet/${post._id}`}>Đọc tiếp</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
            </Slider>
            :
            <div className="item-slider-new bg" style={{
                backgroundImage: "url('/imgs/news.jpg')"
              }}>
            </div>
          }
        </div>
      );
    }
  }
}
const POST_QUERY = gql `
    query posts($limit: Int){
      posts(limit: $limit) {
      _id title  description
      image {
        _id  file fileName
      }
    }
}`

export default compose(graphql(POST_QUERY, {
  options: () => ({
    variables: {limit: 4},
    fetchPolicy: 'network-only'
  })
}),)(SliderNew);
