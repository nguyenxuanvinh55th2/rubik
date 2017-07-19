import React from 'react'
import { Link } from 'react-router'

export default class SingleNews extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="news-block row">
				<div className="news-image col-md-4">
					<img src={this.props.value.image} alt={this.props.value.title} className="responsive" style={{width: "100%"}} />
				</div>
				<div className="news-content col-md-8">
					<h4><Link to={this.props.value.link}>{this.props.value.title}</Link></h4>
					<div className="show-content">
						<p>{this.props.value.content}</p>
					</div>
					<div className="meta">
						<p>Viết bởi <Link to={this.props.value.link_author}><span className="author">{this.props.value.author}</span></Link>, Đăng ngày <span className="date">{this.props.value.created_date}</span></p>
					</div>
				</div>
			</div>

		)
	}
}