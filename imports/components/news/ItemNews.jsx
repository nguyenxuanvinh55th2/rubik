import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';
export default class SingleNews extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let linkDat = 'https://www.facebook.com/badathb?hc_ref=ARTZmrU2-LeqNyyLYFlUDFcz3EV8QSvZVjOMcl9xneT6OCcQedn6rCxNZ-0765zS4lI&fref=nf';
		return (
			<div className="news-block row">
				<div className="news-image col-md-4">
					<img src={this.props.value.image.file ? this.props.value.image.file : ''} alt={this.props.value.title} className="responsive" style={{width: "100%"}} />
				</div>
				<div className="news-content col-md-8">
					<h4><Link to={`/chi-tiet/${this.props.value._id}`}>{this.props.value.title}</Link></h4>
					<div className="show-content">
						<p>{this.props.value.description}</p>
					</div>
					<div className="meta">
						<p>Viết bởi <Link to={linkDat}><span className="author">Lão Bá Đạo</span></Link>, Đăng ngày <span className="date">{moment(this.props.value.createdAt).format('HH:mm DD/MM/YYYY')}</span></p>
					</div>
				</div>
			</div>
		)
	}
}
