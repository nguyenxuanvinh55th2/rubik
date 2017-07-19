import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import StockType from '../components/stockType/StockType.jsx';

const STOCK_TYPE = gql`
    query stockTypes($query: String){
        stockTypes(query: $query) {
            _id
            name
        }
}`

const REMOVE_STOCKTYPE = gql`
    mutation removeStockType($userId: String!, $_id: String!){
        removeStockType(userId: $userId, _id: $_id)
}`

const INSERT_STOCKTYPE = gql`
    mutation insertStockType($userId: String!, $info: String!){
        insertStockType(userId: $userId, info: $info)
}`


export default compose (
    graphql(STOCK_TYPE, {
        options: ()=> ({
            variables: {query: JSON.stringify({
              isProduct: true, active: true, _id: {$ne: '0'}
            })},
            fetchPolicy: 'network-only'
        })
    }),
    graphql(REMOVE_STOCKTYPE, {
        props: ({mutate})=> ({
            removeStockType : (userId, _id) => mutate({variables:{userId, _id}})
        })
    }),
    graphql(INSERT_STOCKTYPE, {
        props: ({mutate})=> ({
            insertStockType : (userId, info) => mutate({variables:{userId, info}})
        })
    }),
)(StockType);
