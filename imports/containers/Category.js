import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import Category from '../components/category/Category.jsx';

const STOCK_CATEGORY_QUERY = gql `
    query categories{
      categories {
          _id
          name
          stockType {
            _id name
          }
      }
      stockTypes {
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
  options: () => ({variables: {}, fetchPolicy: 'network-only'})
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
}),)(Category);
