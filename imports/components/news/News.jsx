import React from 'react'
import __ from 'lodash';
import { Link } from 'react-router'

import SingleNews from './ItemNews.jsx'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
export default class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'news' : [
				{
					image: 'http://rubikviet.vn/wp-content/uploads/2017/04/636276741558899086-33187938183-454bc874ea-k-1492528881313-250x200.jpg',
					title: 'Video hướng dẫn rubik cho người mới chơi',
					content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					link: '#',
					author: 'admin',
					link_author: '#',
					created_date: '21 tháng Tư, 2017',
				},
				{
					image: 'http://rubikviet.vn/wp-content/uploads/2017/04/636276741558899086-33187938183-454bc874ea-k-1492528881313-250x200.jpg',
					title: 'Khối rubik khổng lồ nặng 800kg thách thức người chơi',
					content: 'Với khối rubik khổng lồ, người chơi phải tốn ít nhất một giờ đồng hồ mới có thể phá đảo được trò chơi. Những khối rubik hình lập phương đầy màu sắc từ lâu đã khiến không ít người say mê. Thậm chí, có những người còn có khả năng xếp xong một khối rubik',
					link: '#',
					author: 'admin',
					link_author: '#',
					created_date: '21 tháng Tư, 2017',
				},
				{
					image: 'http://rubikviet.vn/wp-content/uploads/2017/04/636276741558899086-33187938183-454bc874ea-k-1492528881313-250x200.jpg',
					title: 'Hướng dẫn chơi Ribik 3x3x3 nhanh nhất',
					content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					link: '#',
					author: 'admin',
					link_author: '#',
					created_date: '21 tháng Tư, 2017',
				}
			]
		}
	}

	render() {
		return (
			<div>
			<div id="news">
							<h2 className="text-center">Tin tức</h2>
				<div className="main-content container">
					<div className="row">
						<div className="sidebar col-md-3">
							<div className="latest-news block">
								<h3>Bài viết mới</h3>
								<div className="content-block">
									<ul>
										<li><Link to={'#'}>Video hướng dẫn rubik cho người mới chơi</Link></li>
										<li><Link to={'#'}>Khối rubik khổng lồ nặng 800kg thách thức người chơi</Link></li>
										<li><Link to={'#'}>Hướng dẫn chơi Ribik 3x3x3 nhanh nhất</Link></li>
										<li><Link to={'#'}>Giới thiệt về website bán hàng trực tuyến Rubik Việt</Link></li>
									</ul>
								</div>
							</div>

						</div>
						<div className="contents col-md-9">
							{
								__.map(this.state.news,(value,id) => {
									return(
										<SingleNews key={id} value={value} />
									)
								})
							}
						</div>
					</div>
				</div>
			</div>
			</div>
		)
	}
}
