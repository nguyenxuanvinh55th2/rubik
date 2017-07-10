import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
export default class SliderNew extends React.Component {
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
<Slider {...settings} >
    <div className="item-slider-new bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/slider-news_zps8vnwov5h.jpg')"}}>
      <div className="container">
        <h2 className="text-center">TIN TỨC NỔI BẬT</h2>
        <div className="row">
          <div className="col-sm-5">
            <div className="image">
              <img src="http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slidernew_zps7gtzduez.jpg" alt="" />
            </div>
          </div>
          <div className="col-sm-7">
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
            <p>
              Nullam at risus non nunc bibendum aliquam a quis metus. Curabitur est magna, condimentum non finibus quis, varius imperdiet ligula. Nulla lorem nisi, euismod eget mollis nec, hendrerit sed lectus. Suspendisse euismod libero nec convallis aliquam. Sed vel purus cursus, facilisis urna in, auctor magna. Duis ac neque suscipit, pellentesque lorem vel, suscipit ex. Duis eleifend hendrerit libero, a tristique justo iaculis at. Fusce vel vestibulum ante, aliquet ultricies purus. Ut congue suscipit accumsan. Proin ullamcorper sem quis nulla cursus, finibus cursus nisl sagittis. Cras et interdum lectus. Quisque eu dignissim nisl, mattis vestibulum metus. Praesent eget tempus neque, dapibus dictum lorem. Maecenas maximus elementum nisl, in iaculis nulla rhoncus sed.
            </p>
            <p className="text-right"><Link to={'#'}>Đọc tiếp</Link></p>
          </div>
        </div>
      </div>
    </div>
    <div className="item-slider-new bg" style={{backgroundImage: "url('http://i1266.photobucket.com/albums/jj538/dinhvnquang/slider-news_zps8vnwov5h.jpg')"}}>
      <div className="container">
        <h2 className="text-center">TIN TỨC NỔI BẬT</h2>
        <div className="row">
          <div className="col-sm-5">
            <div className="image">
              <img src="http://i1266.photobucket.com/albums/jj538/dinhvnquang/img-slidernew_zps7gtzduez.jpg" alt="" />
            </div>
          </div>
          <div className="col-sm-7">
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>
            <p>
              Nullam at risus non nunc bibendum aliquam a quis metus. Curabitur est magna, condimentum non finibus quis, varius imperdiet ligula. Nulla lorem nisi, euismod eget mollis nec, hendrerit sed lectus. Suspendisse euismod libero nec convallis aliquam. Sed vel purus cursus, facilisis urna in, auctor magna. Duis ac neque suscipit, pellentesque lorem vel, suscipit ex. Duis eleifend hendrerit libero, a tristique justo iaculis at. Fusce vel vestibulum ante, aliquet ultricies purus. Ut congue suscipit accumsan. Proin ullamcorper sem quis nulla cursus, finibus cursus nisl sagittis. Cras et interdum lectus. Quisque eu dignissim nisl, mattis vestibulum metus. Praesent eget tempus neque, dapibus dictum lorem. Maecenas maximus elementum nisl, in iaculis nulla rhoncus sed.
            </p>
            <p className="text-right"><Link to={'#'}>Đọc tiếp</Link></p>
          </div>
        </div>
      </div>
    </div>
  </Slider>
</div>
);
}
}
