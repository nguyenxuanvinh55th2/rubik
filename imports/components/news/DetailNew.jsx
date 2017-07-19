import React from 'react'
import { Link } from 'react-router'
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import QuillRender from '../editor/QuillRender.jsx';
import moment from 'moment'
class DetailNew extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    console.log(this.props);
    if(!this.props.data.post){
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin" style={{
            fontSize: 50
          }}></i>
        </div>
      )
    }else {
      return (
        <div id="news">
            <h2 className="text-center">{this.props.data.post.title}</h2>
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
                <QuillRender value={this.props.data.post.content} />
                <p>Viết bởi Lão Bá Đạo. Đăng ngày {moment(this.props.data.post.createdAt).format('HH:mm DD/MM/YYYY')}</p>
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
