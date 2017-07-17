import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import { HanderEditorStockModel, RenderImage, RenderDescription, UpdateQuantity } from './ChildStockModel.jsx'
class StockModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      open: false,
      name: '',
      dialogType: '',
      stockModelSelect: {}
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
      code: 'Total: ' +  data.length,
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
  deleteStockModel(node){
    var deleteImage = confirm("Bạn có muốn kiểu hàng này?");
    if (deleteImage == true) {
      StockModels.update({_id: node.data._id},{$set: {active: false}},(error) => {
        if(error){
          throw error;
           this.props.addNotificationMute({fetchData: true, message: 'Xóa hàng thất bại', level:'error'});
        }
        else {
          this.props.addNotificationMute({fetchData: true, message: 'Xóa hàng thành công', level:'success'});
          this.props.data.refetch();
        }
      });
    }
  }
  updateStockModes(node){
    browserHistory.push(`/StockModelForm/${node.data._id}`);
  }
  showImage(node){
    this.setState({open: true, dialogType: 'image', stockModelSelect: node.data});
  }
  importStock(node){
    this.setState({open: true, dialogType: 'import', stockModelSelect: node.data});
  }
  exportStock(node){
    this.setState({open: true, dialogType: 'export', stockModelSelect: node.data});
  }
  showDescription(node){
    this.setState({open: true, dialogType: 'description', stockModelSelect: node.data})
  }
  render(){
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
          headerName: "", field: 'delete',  minWidth: 80, width: 80,  pinned: 'left', filter: '',
          cellRendererFramework: HanderEditorStockModel ,
          cellRendererParams: {
              updateStockModes: this.updateStockModes.bind(this), showImage: this.showImage.bind(this), importStock: this.importStock.bind(this),
              exportStock: this.exportStock.bind(this), showDescription: this.showDescription.bind(this), deleteStockModel: this.deleteStockModel.bind(this)
            },
          cellStyle: (params) => {
            if (params.node.data.gridType == 'footer') {
              return {display: 'none'};
            }
          }
        },
        {
          headerName: "Mã kiểu hàng",  field: "code", pinned: 'left',  width: 150, filter: 'text', filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },   suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Tên kiểu hàng", field: "name",  width: 200, filter: 'text',
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Loại hàng", field: "stockType.name",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Chủng loại", field: "categories",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Số lượng", field: "quantity",  width: 200, filter: 'number', suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Đơn vị", field: "unit",  width: 200, filter: 'number', suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Cân nặng", field: "weight",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Xuất xứ", field: "origin",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Hàng giới hạn", field: "isLimited",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Hàng giảm giá", field: "isPromotion",  width: 200, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Giá nhập", field: "averagePrice",  width: 200, filter: 'number', suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Giá bán", field: "price",  width: 200, filter: 'number', suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Giá giảm", field: "saleOff",  width: 200, filter: 'number', suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
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
          <Dialog modal={true}
              open={this.state.open}
              contentStyle={{width: this.state.dialogType == 'import' || this.state.dialogType == 'export' ? 500 : 835, maxWidth: 'none',}}
              bodyStyle={{padding: 0}}
          >
            {
              this.state.dialogType == 'image' ?
              <RenderImage {...this.props} height={window.innerHeight - 250} handleClose={() => this.setState({open: false})}
                  dataImages={this.state.stockModelSelect.images}/> :
              this.state.dialogType == 'description' ?
              <RenderDescription {...this.props} height={window.innerHeight -250} handleClose={() => this.setState({open: false})}
                description={this.state.stockModelSelect.description}/> :
              this.state.dialogType == 'import' ?
              <UpdateQuantity {...this.props} data={this.state.stockModelSelect} type={'import'} handleClose={() => this.setState({open: false})} refeshData={() => this.props.data.refetch()} /> :
              this.state.dialogType == 'export' ?
              <UpdateQuantity {...this.props} data={this.state.stockModelSelect} type={'export'} handleClose={() => this.setState({open: false})} refeshData={() => this.props.data.refetch()} />
              : null
            }
          </Dialog>
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
						_id fileName
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
