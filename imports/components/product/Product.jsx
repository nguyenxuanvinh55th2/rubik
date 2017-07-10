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
				rate: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				rate: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				rate: 100000
			},
			{
				image: "http://i1266.photobucket.com/albums/jj538/dinhvnquang/sp1_zpssqbqw0b3.png",
				name: "Shengshou 3x3x3 Aurora",
				rate: 100000
			}
			]
		}
	}
	render(){
		return(
			<div>
			{
				__.map(this.state.data,(value,idx) => {
					return(
						<ItemProduct key={idx} value ={value} />

						)
				})
			}
			</div>
			)
	}
}