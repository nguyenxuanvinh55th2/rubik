import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {browserHistory} from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
class About extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    console.log(this.props.data);
    if(!this.props.data.post){
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin" style={{
            fontSize: 50
          }}></i>
        </div>
      )
    }
    else {
      return (
        <div>
        <div id="news">
                <h2 className="text-center">Giới thiệu</h2>
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
    query post($_id: String){
        post(_id: $_id) {
        _id title  content  description
        image {
          _id  file fileName
        }
        stockType { _id name }
      }
}`
export default compose(graphql(POST, {
  options: (ownProps) => ({
    variables: {
      _id: '0'
    },
    fetchPolicy: 'network-only'
  })
})
)(About);
