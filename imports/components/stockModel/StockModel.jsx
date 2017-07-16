import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
class DeleteAditorRender extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{
        width: '100%'
      }}>
        <button className="btn btn-default" style={{
          borderWidth: 0,
          width: 56,
          color: 'red'
        }}>Xóa</button>
      </div>
    )
  }
}
class StockModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      open: false,
      name: ''
    }
    this.gridOptions = {
    floatingFilter: true,
    onFilterChanged: () => {
        let data = [], models = this.gridOptions.api.getModel().rowsToDisplay;
        __.forEach(models, (model) => {
            data.push(model.data);
        });
        this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(data));
        this.saveFilter = this.gridOptions.api.getFilterModel();
      }
    };
  }
  renderFooterData(data) {
  return [
    {
      gridType: 'footer',
      name: 'Total: ' +  data.length,
    }];
  }
  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
      this.gridOptions.api.setRowData(this.props.data.stockModels);
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.stockModels));
      this.gridOptions.api.hideOverlay();
    }
  }
  render(){
    console.log(this.props);
    if(!this.props.data.stockModels){
      return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
        </div>
      )
    }
    else {
      let columnDefs = [
        {
          headerName: "",
          field: 'delete',
          minWidth: 56,
          width: 56,
          cellClass: 'agaction',
          pinned: 'left',
          filter: '',
          cellRendererFramework: DeleteAditorRender,
          cellStyle: (params) => {
            if (params.node.data.gridType == 'footer') {
              return {display: 'none'};
            }
          },
          onCellClicked: (params) => {
            if (params.data && params.data._id) {
              this.props.removeCategories(Meteor.userId(), params.data._id).then(({data}) => {
                if (data) {
                  this.props.data.refetch();
                }
              })
            }
          }
        }, {
          headerName: "Tên kiểu hàng",
          field: "name",
          width: 320,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          },
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          filter: 'text',
          suppressMenu: true
        }
      ];
      return(
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <ol className="breadcrumb" style={{marginBottom: 0, backgroundColor: 'white'}}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/stockModels')}>Kiểu hàng</a>
              </li>
            </ol>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
              <button type="button" className="btn btn-primary" onClick={() => browserHistory.push('/stockModelForm')}>Tạo mới</button>
            </div>
          </div>
          <div style={{  height: this.state.height - 136}} className="ag-fresh">
            <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={this.data} enableColResize="true" enableSorting="true" enableFilter="true"/>
          </div>
        </div>
      )
    }
  }
}
const STOCK_MODEL_QUERY = gql `
    query stockModels($limit: Int){
        stockModels(limit: $limit) {
          _id code name weight isLimited  isPromotion
          unit averagePrice  price  quantity saleOff description
					images {
						_id
						file
					}
          categories
          stockType {
            _id name
          }
        }
}`

export default compose(graphql(STOCK_MODEL_QUERY, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),)(StockModel);
