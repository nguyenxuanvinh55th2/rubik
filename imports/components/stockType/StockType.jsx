import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Meteor } from 'meteor/meteor';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
class DeleteAditorRender extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
        <div style={{width: '100%'}}>
          <button className="btn btn-default" style={{borderWidth: 0, width: 56, color:'red'}}>Xóa</button>
        </div>
    )
  }
}
export default class StockType extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
        height: window.innerHeight,
        open: false, name: ''
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
  componentDidUpdate(){
  if(this.gridOptions.api){
    this.gridOptions.api.showLoadingOverlay();
    this.gridOptions.api.setRowData(this.props.data.stockTypes);
    this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.stockTypes));
    this.gridOptions.api.hideOverlay();
  }
}
  render(){
    let { data } = this.props;
    if(Meteor.userId()){
      if(!data.stockTypes){
        return (
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
          </div>
        )
      }
      else {
        let columnDefs= [
           {
               headerName: "", field:'delete', minWidth: 56, width: 56, cellClass: 'agaction', pinned: 'left', filter: '',
                 cellRendererFramework:DeleteAditorRender,
                cellStyle: (params) => {
                    if (params.node.data.gridType == 'footer') {
                        return {display: 'none'};
                    }
                },
                onCellClicked: (params) => {
                  if(params.data && params.data._id){
                    this.props.removeStockType(Meteor.userId(), params.data._id).then(({data}) => {
                      if(data){
                        this.props.data.refetch();
                      }
                    })
                  }
                }
           },
           {
               headerName: "Tên loại hàng", field: "name", width: 320, cellStyle: function(params) {
                       if (params.node.data.gridType == 'footer') {
                           return {fontWeight: 'bold'};
                       } else {
                           return null;
                       }
               }, filterParams: {filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']}, filter: 'text', suppressMenu: true,
           }
       ];
       return (
         <div>
           <ol className="breadcrumb" style={{marginBottom: 0}}>
             <li>
               <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
             </li>
             <li>
               <a onClick={() => browserHistory.push('/stockType')}>Loại hàng</a>
             </li>
           </ol>
           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>
             <button type="button" className="btn btn-primary" onClick={() => {
               this.setState({open: true})
             }}>Thêm mới</button>
           </div>
           <div style={{height: this.state.height - 167}} className="ag-fresh">
                 <AgGridReact
                     gridOptions={this.gridOptions}
                     columnDefs={columnDefs}
                     rowData={this.data}
                     enableColResize="true"
                     enableSorting="true"
                     enableFilter="true"
                 />
           </div>
           <Dialog
              modal={true}
              open={this.state.open}
              bodyStyle={{padding: 0}}
              contentStyle={{width: 400}}
            >
              <div className="modal-dialog" style={{width: 'auto', margin: 0}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Tạo mới loại hàng</h4>
                </div>
                <div className="modal-body" style={{overflowY: 'auto', overflowX: 'hidden', overflowY: 'auto', overflowX: 'hidden'}}>
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="control-label col-sm-2">Tên</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={this.state.name} onChange={({target}) => {
                          this.setState({name: target.value})
                        }}/>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={() => this.setState({open: false})}>Đóng</button>
                  <button type="button" className="btn btn-primary" disabled={!this.state.name} onClick={() => {
                    this.props.insertStockType(Meteor.userId(), JSON.stringify({
                      name: this.state.name,
                      active: true,
                      isProduct: true,
                    })).then(({data}) => {
                      if(data){
                        this.props.data.refetch();
                        this.setState({name: '', open: false})
                      }
                    })
                  }}>Lưu</button>
                </div>
              </div>
          </div>
            </Dialog>
         </div>
       )
      }
    }
    else {
      return <div style={{textAlign: 'center'}}>{'Vui lòng đăng nhập'}</div>;
    }
  }
}
