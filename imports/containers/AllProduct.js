import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import AllProduct from '../components/product/AllProduct.jsx';

const ITEMS_PER_PAGE = 10;

const POSTS = gql `
    query findProduct($query: String, $offset: Int, $limit: Int) {
      findProduct(query: $query, offset: $offset, limit: $limit){
        _id    name price
       images {
       _id file
       }
       votes {
         stars
      }
      }
}`

export default compose (
  graphql(POSTS, {
    options: (ownProps) => {
      let query ={
        active: true
      }
      return {
        variables: {
          query: JSON.stringify(query),
          offset: 0,
          limit: ITEMS_PER_PAGE
        },
        fetchPolicy: 'network-only'
      }
    },
    props: ({ ownProps, data: { loading, findProduct, refetch, subscribeToMore, fetchMore} }) => ({
     findProduct: {
       stockModels: findProduct,
       loading: loading,
       refetch: refetch,
       subscribeToMore: subscribeToMore,
       loadMoreEntries: () => {
         return fetchMore({
           variables: {
             offset: findProduct.length
           },
           updateQuery: (previousResult, { fetchMoreResult }) => {
             if (!fetchMoreResult) { return previousResult; }
             return Object.assign({}, previousResult, {
               findProduct:  [...previousResult.findProduct, ...fetchMoreResult.findProduct],
             });
           },
         });
       }
     },
    }),
    })
)(AllProduct);
