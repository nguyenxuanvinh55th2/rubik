import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Meteor} from 'meteor/meteor';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {browserHistory} from 'react-router';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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
        title: 'Total: ' + data.length
      }
    ];
  }
  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
      this.gridOptions.api.setRowData(this.props.data.notifications);
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.notifications));
      this.gridOptions.api.hideOverlay();
    }
  }
  render(){
    let {data} = this.props;
    if (Meteor.userId()) {
      if (!data.notifications) {
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
            headerName: "Tiêu đề",
            field: "title",
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
            headerName: "Loại thông báo",
            field: "type",
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
          },
          {
            headerName: "Thời gian",
            field: "createdAt",
            width: 100,
            cellStyle: function(params) {
              if (params.node.data.gridType == 'footer') {
                return {fontWeight: 'bold'};
              } else {
                return null;
              }
            },
            onCellClicked: (params) => {
              this.setState({invoice: params.data});
            },
            filterParams: {
              filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
            },
            filter: 'text',
            suppressMenu: true,
            cellRenderer: (params)=> {
              if (params.node.data.gridType !== 'footer') {
                return moment(params.value).format('DD/MM/YYYY');
              } else {
                  return '';
              }
            }
          }
        ];
        return (
          <div>
            <ol className="breadcrumb" style={{
              marginBottom: 0
            }}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/orderDevoice')}>Đơn hàng</a>
              </li>
            </ol>
            <div style={{
              height: this.state.height - 125
            }} className="ag-fresh">
              <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={this.data} enableColResize="true" enableSorting="true" enableFilter="true"/>
            </div>
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
const NOTICATION = gql `
    query notifications{
      notifications {
       _id
       title
       isReaded
       link
       type
       createdAt
      }
}`

export default compose(graphql(NOTICATION, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),)(Dashboard);
