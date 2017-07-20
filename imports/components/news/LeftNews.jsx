import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
class LeftNews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="latest-news block">
        <h3>Bài viết mới</h3>
        <div className="content-block">
          {
            !this.props.data.posts ?
            <div className="loading">
                <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
            </div>
            :
            <ul>
              {
                __.map(this.props.data.posts,(post, idx) => {
                  return(
                    <li key={idx}>
                      <Link to={`/chi-tiet/${post._id}`}>{post.title}</Link>
                    </li>
                  )
                })
              }
            </ul>
          }
        </div>
      </div>
    )
  }
}
const POST_QUERY = gql `
    query posts($limit: Int){
      posts(limit: $limit) {
      _id title
    }
}`

export default compose(graphql(POST_QUERY, {
  options: () => ({
    variables: {limit: 5},
    fetchPolicy: 'network-only'
  })
}),)(LeftNews);
