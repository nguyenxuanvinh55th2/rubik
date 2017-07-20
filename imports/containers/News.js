import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import News from '../components/news/News.jsx';

const ITEMS_PER_PAGE = 10;

const POSTS = gql `
    query getPostTypeLimit($stockTypeId: String, $offset: Int, $limit: Int) {
      getPostTypeLimit(stockTypeId: $stockTypeId, offset: $offset, limit: $limit){
        _id title description createdAt
        image {
          _id  file
        }
      }
}`

export default compose (
  graphql(POSTS, {
    options: (ownProps) => {
      return {
        variables: {
          stockTypeId: ownProps.params._id,
          offset: 0,
          limit: ITEMS_PER_PAGE
        },
        fetchPolicy: 'network-only'
      }
    },
    props: ({ ownProps, data: { loading, getPostTypeLimit, refetch, subscribeToMore, fetchMore} }) => ({
     getPostTypeLimit: {
       data: getPostTypeLimit,
       loading: loading,
       refetch: refetch,
       subscribeToMore: subscribeToMore,
       loadMoreEntries: (currentPage) => {
         return fetchMore({
           variables: {
             offset: currentPage
           },
           updateQuery: (previousResult, { fetchMoreResult }) => {
             if (!fetchMoreResult.data) { return previousResult; }
             return Object.assign({}, previousResult, {
               getPostTypeLimit: fetchMoreResult.data.getPostTypeLimit,
             });
           },
         });
       }
     },
    }),
    })
)(News);
