import React from 'react';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
class Colors extends React.Component {
  constructor(props) {
    super(props)
    this.data = [];
    this.state = {
      height: window.innerHeight,
      open: false,
      name: '',  color: '',  image: '', isColor: true, isImageRender: false
    }
  }
  render(){
    let {data} = this.props;
    if (Meteor.userId()) {
      if (!data.categories) {
        return (
          <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{
              fontSize: 50
            }}></i>
          </div>
        )
      } else {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <ol className="breadcrumb" style={{
                marginBottom: 0
              }}>
                <li>
                  <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
                </li>
                <li>
                  <a onClick={() => browserHistory.push('/colors')}>Màu sắc</a>
                </li>
              </ol>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
                <button type="button" className="btn btn-primary" onClick={() => {
                  this.setState({open: true})
                }}>Thêm mới</button>
              </div>
            </div>
          </div>
        )
      }
    }
    else {
      return <div style={{
        textAlign: 'center'
      }}>{'Vui lòng đăng nhập'}</div>;
    }
  }
}
const STOCK_CATEGORY_QUERY = gql `
    query categories($query: String){
      categories {
          _id
          name
          stockType {
            _id name
          }
      }
      stockTypes(query: $query) {
          _id name
      }
}`

const REMOVE_STOCK_CATEGORY = gql `
    mutation removeCategories($userId: String!, $_id: String!){
        removeCategories(userId: $userId, _id: $_id)
}`

const INSERT_STOCK_CATEGORY = gql `
    mutation insertCategories($userId: String!, $info: String!){
        insertCategories(userId: $userId, info: $info)
}`

export default compose(graphql(STOCK_CATEGORY_QUERY, {
  options: () => ({variables: {
    query: JSON.stringify(
    {
      isColor: true, active : true, _id: {$ne: '0'}
    }
  )}, fetchPolicy: 'network-only'})
}), graphql(REMOVE_STOCK_CATEGORY, {
  props: ({mutate}) => ({
    removeCategories: (userId, _id) => mutate({
      variables: {
        userId,
        _id
      }
    })
  })
}), graphql(INSERT_STOCK_CATEGORY, {
  props: ({mutate}) => ({
    insertCategories: (userId, info) => mutate({
      variables: {
        userId,
        info
      }
    })
  })
}),)(Colors);
