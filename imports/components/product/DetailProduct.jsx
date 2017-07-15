import React from 'react'

import __ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';

import {Link} from 'react-router';
import SliderDetails from '../home/SliderDetail.jsx'
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
import {slideChitiet} from '../../javascript/header.js'
class DetailProduct extends React.Component{
constructor(props) {
super(props);
this.state = {number: 5};
}
componentDidMount() {
slideChitiet();
}

componentDidUpdate() {
	let { stockModelById  } = this.props.data;
	if(stockModelById ) {
		if(stockModelById.description) {
			console.log("message1");
			setTimeout(() => {
				console.log("message2");
				let description = document.getElementById('mota');
				console.log("message3 ", description);
				if(description) {
					console.log("message");
					description.innerHTML = stockModelById.description;
				}
			}, 500)
		}
	}
}

codeBill(number) {
	var randomChar = '',
		string = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
	for (var i = 0; i < number; i++) {
		randomChar += string.substr(Math.floor(Math.random() * string.length), 1);
	}
	return randomChar;
}

addToCart() {
	let token = localStorage.getItem('invoiceId');
	let { stockModelById } = this.props.data;
	if(!token || token === '') {
		token = 'DH' + '-' + this.codeBill(4);
		localStorage.setItem('invoiceId', token);
	}
	let invoice = {
		_id: token,
		code: token,
		status: 0,
		customer: {},
		amount: 0,
		discount: 100,
		total: 0,
		createdAt: moment().valueOf(),
		shipFee: 0
	}
	let detail = {
		stockModel: stockModelById,
		quantity: this.state.number,
		amount: this.state.number * stockModelById.price,
		invoice: {
			_id: token,
			code: token
		},
		createdAt: moment().valueOf(),
	}
	invoice = JSON.stringify(invoice);
	detail = JSON.stringify(detail);
	this.props.insertInvoice(token, invoice).then(() => {
		console.log("token ", token);
		this.props.insertInvoiceDetail(token, detail);
	})
}

render(){
	let { stockModelById } = this.props.data;
	if(stockModelById) {
		console.log("stockModelById ", stockModelById);

		let images = [];
		__.forEach(stockModelById.images, (item, idx) => {
			if(idx < 3) {
				images.push(item.file);
			}
		});
		return(

		<div>
			<Header />
			<div className="product-detail">
				<div className="container">
					<div className="row">
						<div className="col-sm-3">
						<div className="danhmuc-sp">
							<h3>DANH MỤC SẢN PHẨM</h3>
							<h4><a  role="button" data-toggle="collapse" href="#collapsePlus1" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">RUBIK</a></h4>
							<div className="more collapse" id="collapsePlus1">
								<p>Comic Spinner</p>
								<p>Fidget Cube</p>
							</div>
							<h4><a  role="button" data-toggle="collapse" href="#collapsePlus2" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">Spiner</a></h4>
							<div className="more collapse" id="collapsePlus2">
								<p>Comic Spinner</p>
								<p>Fidget Cube</p>
							</div>
							<h4><a  role="button" data-toggle="collapse" href="#collapsePlus3" aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion">Các phụ kiện khác</a></h4>
							<div className="more collapse" id="collapsePlus3">
								<p>Comic Spinner</p>
								<p>Fidget Cube</p>
							</div>
						</div>
						</div>
						<div className="col-sm-9">
							<div className="row">
								<div className="col-sm-7">
									<div className="slider-anh">
										<div className="show-anh">
											{
												images.map((item, idx) => (
													<div key={idx} className={idx === 0 ? "item" + idx + " item active" : "item" + idx + " item"}>
														<img src={item} alt="" />
													</div>
												))
											}
										</div>
										<div className="click-anh">
											<ul>
												{
													images.map((item, idx) => (
														<li key={idx} data={idx}>
															<img src={item} alt="" />
														</li>
													))
												}
											</ul>
										</div>
									</div>
								</div>
								<div className="col-sm-5">
									<div className="thongtin-sp">
										<h3>{stockModelById.name.toUpperCase()}</h3>
										<h4 className="ma">{'Mã: ' + stockModelById.code}</h4>
										<h4 className="gia">{'Giá ' + accounting.format(stockModelById.price)}</h4>
										<h4 className="trangthai">{stockModelById.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</h4>
										<h4 className="dmuc">Danh mục: Rubik 2x2x2</h4>
										<p><a className="btn-more btn-red" href="#">MUA HÀNG</a></p>
										<div className="one-space"></div>
										<p><a className="btn-more" href="#" onClick={this.addToCart.bind(this)}>THÊM VÀO GIỎ HÀNG</a></p>
									</div>
								</div>
							</div>
							<div className="sec-tab">
		  <ul className="group-tab" role="tablist">
		    <li role="presentation" className="active"><a href="#mota" aria-controls="mota" role="tab" data-toggle="tab">Mô tả</a></li>
		    <li role="presentation"><a href="#danhgia" aria-controls="danhgia" role="tab" data-toggle="tab">Đánh giá</a></li>
		  </ul>

		  <div className="tab-content">
		    <div role="tabpanel" className="tab-pane active" id="mota">
		    </div>
		    <div role="tabpanel" className="tab-pane" id="danhgia">
		    	<div class="binhluan">
		    		<h4>Bình luận</h4>
		    	<p>Sản phẩm chất lượng</p>
		    	</div>
		    	<div className="form-group">
		    	<textarea  rows="4" className="form-control" placeholder="Nhập bình luận"></textarea >
		    	</div>
		    </div>
		  </div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
		)
	} else {
			return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
        </div>
      )
	}
}
}

const STOCK_MODEL_QUERY = gql`
    query stockModelById($_id: String!){
        stockModelById(_id: $_id) {
            _id
						code
            name
						quantity
						saleOff
						isPromotion
						images {
							_id
							file
						}
            price
						description
        }
}`

const INSERT_INVOICE = gql`
    mutation insertInvoice($token: String!, $info: String){
        insertInvoice(token: $token, info: $info)
}`

const INSERT_INVOICE_DETAIL = gql`
    mutation insertInvoiceDetail($token: String!, $info: String){
        insertInvoiceDetail(token: $token, info: $info)
}`

export default compose (
    graphql(STOCK_MODEL_QUERY, {
        options: (ownProps)=> ({
            variables: {_id: ownProps.params.id},
            fetchPolicy: 'network-only'
        })
    }),
		graphql(INSERT_INVOICE , {
        props: ({mutate})=> ({
            insertInvoice : (token, info) => mutate({variables:{token, info}})
        })
    }),
    graphql(INSERT_INVOICE_DETAIL, {
        props: ({mutate})=> ({
            insertInvoiceDetail : (token, info) => mutate({variables:{token, info}})
        })
    }),
)(DetailProduct);
