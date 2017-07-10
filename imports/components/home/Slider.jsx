import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
export default class Sliders extends React.Component {
constructor(props) {
  super(props);
}
render() {
  var settings = {
        arrows : true,
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
      <Slider {...settings}>
        <div className="item-slider" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slider_zpsdjbfpcuh.jpg')"}}>
        </div>
         <div className="item-slider" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slider_zpsdjbfpcuh.jpg')"}}>
        </div>
        <div className="item-slider" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slider_zpsdjbfpcuh.jpg')"}}>
        </div>
      </Slider>
    </div>
  );
 }
}
