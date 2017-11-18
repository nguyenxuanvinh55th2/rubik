import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
class Setting extends React.Component {
  constructor(props) {
    super(props)
  }
  handleDownload(){
   __.forEach(this.props.data.stockModels, (stockModel, idx) => {
     __.forEach(stockModel.images,(image) => {
       var link = document.createElement("a");
       link.download = image._id;
       link.href = image.file;
       link.click();
     })
   })
 }
  render(){
    return (
      <div>
        {
          this.props.data.stockModels && this.props.data.stockModels.length ?
          <button type="button" className="btn btn-danger" onClick={() => this.handleDownload()}>Downloads</button>
          : null
        }
      </div>
    )
  }
}
const STOCK_MODEL_QUERY = gql `
    query stockModels($limit: Int){
        stockModels(limit: $limit) {
          _id code name
					images {
						_id fileName
						file
					}
        }
}`

export default compose(graphql(STOCK_MODEL_QUERY, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),)(Setting);
