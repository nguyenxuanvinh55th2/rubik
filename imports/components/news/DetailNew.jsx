import React from 'react'
import { Link } from 'react-router'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import QuillRender from '../editor/QuillRender.jsx';
import moment from 'moment';
import LeftNews from './LeftNews.jsx';
class DetailNew extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate(){
    let description = document.getElementById('description');
    if(description) {
      description.innerHTML = this.props.data.post.content;
    }
  }
	render() {
		let linkDat = 'https://www.facebook.com/badathb?hc_ref=ARTZmrU2-LeqNyyLYFlUDFcz3EV8QSvZVjOMcl9xneT6OCcQedn6rCxNZ-0765zS4lI&fref=nf';
    if(!this.props.data.post || this.props.data.loading){
			if(this.props.data.loading){
				return (
					<div className="item-slider">
						<div className="loading">
								<i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
						</div>
					</div>
	      )
			}
			else {
				return (
					<div className="column">
						<p className="text-center">Xin lỗi, không tìm thấy sản phẩm bạn yêu cầu, vui lòng liên hệ với shop để được hỗ trợ.</p>
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
				)
			}
    }else {
      return (
        <div id="news">
            <h2 className="text-center">{this.props.data.post.title}</h2>
          <div className="main-content container">
            <div className="row">
              <div className="sidebar col-md-3">
                <LeftNews />
              </div>
              <div className="contents col-md-9">
                <div id="description"></div>
								<p>Viết bởi <Link to={linkDat}><span className="author">Lão Bá Đạo</span></Link>, Đăng ngày <span className="date">{moment(this.props.value.createdAt).format('HH:mm DD/MM/YYYY')}</span></p>
              </div>
            </div>
          </div>
        </div>
      )
    }
	}
}
const POST = gql `
    query post($_id: String){
        post(_id: $_id) {
        _id title  content  description createdAt
        image {
          _id  file fileName
        }
      }
}`

export default compose(graphql(POST, {
  options: (ownProps) => ({
    variables: {
      _id: ownProps.params._id ? ownProps.params._id : ''
    },
    fetchPolicy: 'network-only'
  })
})
)(DetailNew);
