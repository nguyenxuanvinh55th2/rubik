import React from 'react'
import __ from 'lodash';
import {Link} from 'react-router';
import ItemProduct from './ItemProduct.jsx';
export default class Product extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			'data':[
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				price: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				price: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				price: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				price: 100000
			}
			]
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.stockModels) {
			let stockModels = __.cloneDeep(nextProps.stockModels);
			__.forEach(stockModels, item => {
				item.image = item.images[0].file;
			})
			this.setState({data: stockModels})
		}
	}

	render(){
		let stockModels = __.cloneDeep(this.props.stockModels);
		__.forEach(stockModels, item => {
			item.image = item.images[0].file;
		})
		return(
			<div>
			{
				__.map(this.state.data, (value,idx) => {
					return(
						<ItemProduct key={idx} value ={value} />

						)
				})
			}
			</div>
			)
	}
}
