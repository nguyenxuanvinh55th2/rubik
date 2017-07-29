import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Meteor} from 'meteor/meteor';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {browserHistory} from 'react-router';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
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
export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      height: window.innerHeight,
      open: false,
      name: '',
      stockType: {
        _id: '',
        name: ''
      }
    }
    this.gridOptions = {
      floatingFilter: true,
      onFilterChanged: () => {
        let data = [],
          models = this.gridOptions.api.getModel().rowsToDisplay;
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
        name: 'Total: ' + data.length
      }
    ];
  }
  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
      this.gridOptions.api.setRowData(this.props.data.categories);
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.categories));
      this.gridOptions.api.hideOverlay();
    }
  }
  render() {
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
            headerName: "Tên chủng loại",
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
          }, {
            headerName: "Loại hàng",
            field: "stockType.name",
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
        return (
          <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <ol className="breadcrumb" style={{
                marginBottom: 0
              }}>
                <li>
                  <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
                </li>
                <li>
                  <a onClick={() => browserHistory.push('/category')}>Chủng loại</a>
                </li>
              </ol>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
                <button type="button" className="btn btn-primary" onClick={() => {
                  this.setState({open: true})
                }}>Thêm mới</button>
              </div>
            </div>
            <div style={{
              height: this.state.height - 136
            }} className="ag-fresh">
              <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={this.data} enableColResize="true" enableSorting="true" enableFilter="true"/>
            </div>
            <Dialog modal={true} open={this.state.open} bodyStyle={{
              padding: 0
            }} contentStyle={{
              width: 500, height: '90%'
            }}>
              <div className="modal-dialog" style={{
                width: 'auto',
                margin: 0
              }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Tạo mới chủng loại</h4>
                  </div>
                  <div className="modal-body" style={{height: window.innerHeight - 250 , overflowY: 'auto',  overflowX: 'hidden'}}>
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label className="control-label col-sm-3">Tên</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={this.state.name} onChange={({target}) => {
                            this.setState({name: target.value})
                          }}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-3">Loại hàng</label>
                        <div className="col-sm-9">
                          <Select name="form-field-name" value={this.state.stockType._id
                            ? this.state.stockType._id
                            : ''} valueKey="_id" labelKey="name" options={this.props.data.stockTypes} placeholder="Chọn loại hàng" onChange={(value) => {
                            this.setState((prevState) => {
                              prevState.stockType = value;
                              return prevState;
                            })
                          }}/>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={() => this.setState({open: false})}>Đóng</button>
                    <button type="button" className="btn btn-primary" disabled={!this.state.name || !this.state.stockType._id} onClick={() => {
                      this.props.insertCategories(Meteor.userId(), JSON.stringify({name: this.state.name, active: true, isCategory: true, stockType: this.state.stockType})).then(({data}) => {
                        if (data) {
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
    } else {
      return <div style={{
        textAlign: 'center'
      }}>{'Vui lòng đăng nhập'}</div>;
    }
  }
}
