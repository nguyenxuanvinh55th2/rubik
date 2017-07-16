import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
import {baseUrl} from 'react-slick'
export default class SliderDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const settings = {
      customPaging: function(i) {
        return <a><img src={`${baseUrl}/abstract0${i + 1}.jpg`}/></a>
      },
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          <div><img src={baseUrl + '/http://streaming1.danviet.vn/upload/2-2015/images/2015-04-20/1434180134-xdmvde_thuong_20_ixzv.jpg'}/></div>
          <div><img src={baseUrl + '/http://streaming1.danviet.vn/upload/2-2015/images/2015-04-20/1434180134-xdmvde_thuong_20_ixzv.jpg'}/></div>
          <div><img src={baseUrl + '/http://streaming1.danviet.vn/upload/2-2015/images/2015-04-20/1434180134-xdmvde_thuong_20_ixzv.jpg'}/></div>
          <div><img src={baseUrl + '/abstract04.jpg'}/></div>
        </Slider>
      </div>
    );
  }
}
