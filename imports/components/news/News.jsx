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
	componentWillMount(){
		if(this.props.changeHeader){
			this.props.changeHeader(this.props.params._id == '1' ? 'news': 'tutorial');
		}
	}
	render() {
		if(!this.props.getPostTypeLimit.data){
			return(
				<div className="content">
					<div className="loading">
							<i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="content">
				<div id="news">
						<h2 className="text-center">{this.props.params._id == '1' ? 'Tin tức' : 'Hướng dẫn chơi'}</h2>
					<div className="main-content container">
						<div className="row">
							<div className="sidebar col-md-3">
								<LeftNews {...this.props} />
							</div>
							{
								this.props.getPostTypeLimit.data.length ?
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
								:
								<div className="column">
									<p className="text-center">Xin lỗi, hiện tại shop vẫn chưa bổ sung bài đăng, shop sẽ cập nhật ngay.</p>
									<p className="text-center">Bạn có thể theo dõi thông tin của shop trên facebook
											<span style={{padding: '0 10px'}}>
											  <a href="https://www.facebook.com/rubiknt/" target="blank">
		                    	<i className="fa fa-facebook" aria-hidden="true" style={{fontSize: 20, color: '#f94949'}}></i>
		                  	</a>
										</span>
										hoặc tại kênh youtube
										 <span style={{padding: '0 10px'}}>
											 <a href="https://www.youtube.com/channel/UCdrq9JuGSPd0aCJH-tAOXZQ" target="blank">
	                    		<i className="fa fa-youtube-play" aria-hidden="true" style={{fontSize: 20, color: '#f94949'}}></i>
	                  		</a>
										</span>
									</p>
								</div>
							}
						</div>
					</div>
				</div>
				</div>
			)
		}
	}
}
