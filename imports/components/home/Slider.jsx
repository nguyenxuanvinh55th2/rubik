import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash'
class Sliders extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
    let defaultImage = 'http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slider_zpsdjbfpcuh.jpg';
    if(!this.props.data.slider){
        return(
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
          </div>
        )
    }
    else {
      return (
        <div>
          <Slider {...settings}>
            {
              __.map(this.props.data.slider.sliders,(slider,idx) =>{
                return(
                  <div key={idx} className="item-slider" style={{
                    backgroundImage: `url(${slider.image && slider.image.file && slider.image._id ? slider.image.file : defaultImage})`
                  }}></div>
                )
              })
            }
          </Slider>
        </div>
      );
    }
  }
}
const SLIDER = gql `
    query slider{
      slider {
        _id
        name
        sliders {
          image {
            _id
            file
            fileName
            type
          }
          link
        }
      }
}`

export default compose(
  graphql(SLIDER, {
    options: () => ({variables: {}, fetchPolicy: 'network-only'})
  }))(Sliders);
