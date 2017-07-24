import React from 'react';
import { Link, browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
class LeftProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
        <div className="danhmuc-sp">
          <h3>DANH MỤC SẢN PHẨM</h3>
          {
            !this.props.data.stockTypes ?
            <div className="loading">
                <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
            </div>
            :
            <div>
              {
                __.map(this.props.data.stockTypes, (stockType, idx) => {
                  return (
                    <div key={idx}>
                      <h4>
                        <a onClick={() => browserHistory.push(`/san-pham/loai-hang/${stockType._id}`)}>{stockType.name}
                        </a>
                        <span  role="button" data-toggle="collapse" href={`#${stockType._id}`} aria-expanded="false" aria-controls="collapsePlus8" data-parent="#accordion"></span>
                      </h4>
                      <div className="more collapse" id={stockType._id}>
                        {
                          __.map(stockType.categories, (category, index) => {
                            return <p onClick={() => {
                              browserHistory.push(`/san-pham/chung-loai/${category.name}`)
                            }} style={{cursor: 'pointer'}} key={index} ref={category._id}>{category.name}</p>
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          }
        </div>
      )
  }
}
const TYPE_QUERY = gql `
    query stockTypes($query: String){
      stockTypes(query: $query) {
          _id
          name
          categories {
            _id name
          }
      }
}`

export default compose(graphql(TYPE_QUERY, {
  options: () => ({
    variables: {
      query: JSON.stringify({isProduct: true, active: true})
    },
    fetchPolicy: 'network-only'
  })
}))(LeftProduct);
