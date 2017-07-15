import React from 'react'

import __ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import accounting from 'accounting';
import moment from 'moment';

import {Link} from 'react-router';
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
class Cart extends React.Component{
constructor(props) {
super(props);
}
render(){
	let { getInVoice } = this.props.data;
	if(getInVoice) {
return(

<div>
	<Header />
	<div className="sec-cart">
		<div className="container">
			<h3 className="text-center">GIỎ HÀNG CỦA BẠN</h3>
			<div className="row">
				<div className="col-sm-8">
					<div className="left-cart">
				{
					__.map(getInVoice.invoiceDetails, (item, idx) => (
						<div className={"box-cart"}>
							<div className="row">
								<div className="col-sm-3">
								<div className="image">
									<img src={item.stockModel.images[0].file} alt="" />
								</div>
								</div>
								<div className="col-sm-9">
									<h4>{item.stockModel.name}</h4>
									<h4>Danh mục: Rubik 2x2x2</h4>
									<h4>{'Giá: ' +  accounting.format(item.stockModel.price) + 'đ'}</h4>
									<div className="group-star"><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></div>
									<span className="close"><i className="fa fa-times" aria-hidden="true"></i></span>
								</div>
							</div>
						</div>
					))
				}
					</div>
				</div>
				<div className="col-sm-4">
					<div className="right-cart">
						<h4>Thông tin đơn hàng</h4>
						<table>
							<thead>
								<tr>
									<th>Sản phẩm</th>
									<th>Số lượng</th>
									<th>Giá</th>
								</tr>
							</thead>
							<tbody>
								{
									__.map(getInVoice.invoiceDetails, item => (
										<tr>
											<td>{item.stockModel.name}</td>
											<td>{item.quantity}</td>
											<td>{accounting.format(item.stockModel.price)}</td>
										</tr>
									))
								}
							</tbody>
						</table>
						<hr />
						<p>Thành tiền <span>(Tổng số tiền thanh toán)</span></p>
						<p className="text-right rate">{ accounting.format(getInVoice.total) + 'đ' }</p>
						<p className="text-center">
						<a className="btn-more btn-red" href="#">Thanh toán</a>
						</p>
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

const INVOICE_QUERY = gql`
    query getInVoice($token: String!){
        getInVoice(token: $token) {
					_id
					code
					status
					amount
					discount
					total
					createdAt
					shipFee
					invoiceDetails {
						_id
						stockModel {
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
						quantity
						amount
					}
        }
}`

const INSERT_INVOICE = gql`
    mutation insertInvoice($token: String!, $info: String){
        insertInvoice(token: $token, info: $info)
}`

const INSERT_INVOICE_DETAIL = gql`
    mutation insertInvoiceDetail($token: String!, $info: String){
        insertInvoiceDetail(info: $info)
}`

export default compose (
    graphql(INVOICE_QUERY, {
        options: (ownProps)=> ({
            variables: {token: localStorage.getItem('invoiceId') ? localStorage.getItem('invoiceId') : ''},
            fetchPolicy: 'network-only'
        })
    }),
)(Cart);
