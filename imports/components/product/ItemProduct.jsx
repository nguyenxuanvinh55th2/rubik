import React from 'react'
import {Link} from 'react-router';
export default class ItemProduct extends React.Component{
constructor(props) {
super(props);
}
render(){
return(

<div className="col-sm-3">
	<div className="item-product">
		<div className="box-item">
			<img src={this.props.value.image} alt="" />
			<Link to={'#'} className="hover-product"></Link>
			<div className="chart">
				<Link to={'#'}><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
			</div>
			<div className="link-detail">
				<Link to={'#'} className="btn btn-cate">Xem chi tiết</Link>
			</div>
		</div>
		<div className="info-product">
			<h4>
				<Link to={'#'}>{this.props.value.name}</Link>
			</h4>
			<div className="star">
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
			</div>
			<p>{this.props.value.rate} đ</p>
		</div>
	</div>
</div>
)
}
}