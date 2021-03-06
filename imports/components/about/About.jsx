import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import  { Link } from 'react-router';
import QuillRender from '../editor/QuillRender.jsx';
import LeftNews from '../news/LeftNews.jsx';
class About extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount(){
		if(this.props.changeHeader){
			this.props.changeHeader('about');
		}
	}
  render(){
    let defaultString = `<p>Chào các bạn đến với Shop Rubik Nha Trang website chính thức của Youtuber Lão Bá Đạo.
                        Bên mình cung cấp nhiều loại rubik khác nhau từ speed cube đến biến thể chính hãng với giá tốt.
                        Nếu các bạn không tìm được mặt hàng các bạn cần hãy liên hệ bên mình sẽ order hàng về cho các bạn.
                        Chúc các bạn mua sắm vui vẻ.</p>`;
    if(!this.props.data.getAllPostByType){
      return (
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
                <h2 className="text-center">Giới thiệu</h2>
          <div className="main-content container">
            <div className="row">
              <div className="sidebar col-md-3">
                <LeftNews {...this.props} />
              </div>
              <div className="contents col-md-9">
                <QuillRender value={this.props.data.getAllPostByType[0] ? this.props.data.getAllPostByType[0].content : defaultString} />
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    }
  }
}
const POST = gql `
    query post($stockTypeId: String){
        getAllPostByType(stockTypeId: $stockTypeId) {
        _id content
      }
}`
export default compose(graphql(POST, {
  options: (ownProps) => ({
    variables: {
      stockTypeId: '0'
    },
    fetchPolicy: 'network-only'
  })
}),
)(About);
