import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Meteor} from 'meteor/meteor';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {browserHistory} from 'react-router';
import { Classifies } from '../../../collections/classifies';
import __ from 'lodash';
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
class Customers extends React.Component {
  constructor(props) {
    super(props)
    this.data = [];
    this.state = {
      height: window.innerHeight,
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
      this.gridOptions.api.setRowData(this.props.data.customers);
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.customers));
      this.gridOptions.api.hideOverlay();
    }
  }
  render(){
    let { data } = this.props;
    if (Meteor.userId()) {
      if (!data.customers) {
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
                var deleteImage = confirm("Bạn có muốn khách hàng này?");
                if (deleteImage == true) {
                  Classifies.remove({_id: params.data._id}, (error) => {
                    if(error){
                      throw error
                    }
                    else {
                      this.props.addNotificationMute({fetchData: true, message: 'Xóa thành công', level:'success'});
                      this.props.data.refetch();
                    }
                  })
                }
              }
            }
          }, {
            headerName: "Email khách hàng đăng kí",
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
        return (
          <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <ol className="breadcrumb" style={{
                marginBottom: 0
              }}>
                <li>
                  <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
                </li>
              </ol>
              {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
                <button type="button" className="btn btn-primary" onClick={() => {
                  this.setState({open: true})
                }}>Thêm mới</button>
              </div> */}
            </div>
            <div style={{
              height: this.state.height - 136
            }} className="ag-fresh">
              <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={this.data} enableColResize="true" enableSorting="true" enableFilter="true"/>
            </div>
          </div>
        )
      }
    }
    else {
      return <div style={{
        textAlign: 'center'
      }}>{'Vui lòng đăng nhập'}</div>;
    }
  }
}
const STOCK_COLORS = gql `
    query customers{
      customers {
          _id name
      }
}`

const REMOVE_COLOR = gql `
    mutation removeColor($userId: String!, $_id: String!){
        removeColor(userId: $userId, _id: $_id)
}`

export default compose(graphql(STOCK_COLORS, {
  options: () => ({variables: {}, fetchPolicy: 'network-only'})
}), graphql(REMOVE_COLOR, {
  props: ({mutate}) => ({
    removeColor: (userId, _id) => mutate({
      variables: {
        userId,
        _id
      }
    })
  })
}))(Customers);
