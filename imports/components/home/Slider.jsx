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
    let defaultImage = '/imgs/event.jpg';
    if(!this.props.data.sliders){
        return(
          <div className="item-slider">
            <div className="loading">
                <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
            </div>
          </div>
        )
    }
    else {
      let settings = {
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
            this.props.data.sliders.length ?
            <Slider {...settings}>
              {
                __.map(this.props.data.sliders,(slider,idx) =>{
                  return(
                    <div key={idx} className="item-slider" style={{
                      backgroundImage: `url(${slider.image && slider.image.file && slider.image._id ? slider.image.file : defaultImage})`
                    }}></div>
                  )
                })
              }
            </Slider>
            :
            <Slider {...settings}>
              <div  className="item-slider" style={{
                backgroundImage: `url(${defaultImage})`
              }}></div>
            </Slider>
          }
        </div>
      );
    }
  }
}
const SLIDER = gql `
    query sliders($query: String){
      sliders(query: $query) {
        _id
        name
        image {
          _id
          file
          fileName
          type
        }
        link
      }
}`

export default compose(
  graphql(SLIDER, {
    options: () => ({variables: {
      query: JSON.stringify(
        {
          active: true, isSlider: true
        }
      )
    }, fetchPolicy: 'network-only'})
  }))(Sliders);
