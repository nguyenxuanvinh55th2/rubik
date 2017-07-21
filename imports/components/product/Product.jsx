import React from 'react'
import __ from 'lodash';
import {Link} from 'react-router';
import ItemProduct from './ItemProduct.jsx';
import {showProduct} from '../../javascript/header.js'

export default class Product extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			'data':[
			{
				image: "",
				name: "",
				price: ""
			},
			{
				image: "",
				name: "",
				price: ""
			},
			{
				image: "",
				name: "",
				price: ""
			},
			{
				image: "",
				name: "",
				price: ""
			}
			]
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.stockModels) {
			let stockModels = __.cloneDeep(nextProps.stockModels);
			__.forEach(stockModels, item => {
				item.image = item.images [0] ? item.images[0].file : 'http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png';
			})
			this.setState({data: stockModels})
		}
	}

	render(){
		return(
			<div>
			{
				__.map(this.state.data, (value,idx) => {
					return(
						<ItemProduct {...this.props} key={idx} value ={value} />

						)
				})
			}
			</div>
			)
	}
}
