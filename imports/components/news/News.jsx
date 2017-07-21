import React from 'react'
import __ from 'lodash';
import { Link } from 'react-router'

import SingleNews from './ItemNews.jsx'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import LeftNews from './LeftNews.jsx';
export default class News extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(!this.props.getPostTypeLimit.data){
			return(
				<div className="item-slider">
					<div className="loading">
							<i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
					</div>
				</div>
			)
		}
		else {
			return (
				<div>
				<div id="news">
						<h2 className="text-center">{this.props.params._id == '1' ? 'Tin tức' : 'Hướng dẫn chơi'}</h2>
					<div className="main-content container">
						<div className="row">
							<div className="sidebar col-md-3">
								<LeftNews {...this.props} />
							</div>
							<div className="contents col-md-9">
								{
									__.map(this.props.getPostTypeLimit.data,(value,id) => {
										return(
											<SingleNews {...this.props} key={id} value={value} />
										)
									})
								}
								<p className="text-center">
		              <Link onClick={() => {
										this.props.getPostTypeLimit.loadMoreEntries();
									}} className="btn-more">Xem thêm</Link>
		            </p>
							</div>
						</div>
					</div>
				</div>
				</div>
			)
		}
	}
}
