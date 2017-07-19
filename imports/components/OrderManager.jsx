import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import moment from 'moment';

import InvoiceDetail from './InvoiceDetail.jsx';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let { t } = this.props;
    return (
        <div style={{width: '100%'}}>
          <button className="btn btn-default" disabled={this.props.data.status === 99} style={{borderWidth: 0, width: 56, color:'red'}}>Hủy</button>
        </div>
    )
  }
}

class VerifyButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let { t } = this.props;
    return (
        <div style={{width: '100%'}}>
          <button className="btn btn-primary" disabled={!this.props.data.status === 1} style={{borderWidth: 0, width: 56}}>Duyệt</button>
        </div>
    )
  }
}

class CompleteButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let { t } = this.props;
    return (
        <div style={{width: '100%'}}>
          <button className="btn btn-primary" disabled={!this.props.data.status === 99} style={{borderWidth: 0, width: 56}}>Hoàn thành</button>
        </div>
    )
  }
}

class OrderDevoice extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      height: window.innerHeight,
      open: false,
      name: ''
    }
    this.gridOptions = {
      icons: {
          groupExpanded: '<span style="width: 25px;height: 25px; text-align: center;margin-left: 8px;"><i style="font-weight: bolder;" class="fa fa-angle-down"></i></span>',
          groupContracted: '<span style="width: 25px;height: 25px; text-align: center;margin-left: 8px;"><i style="font-weight: bolder;" class="fa fa-angle-right"></i></span>',
      },
      getNodeChildDetails: (params) => {
          if (params.isparent === true) {
              return {
                  group: true,
                  children: params.children,
                  expanded: params.open
              };
          } else {
              return null;
          }
      },
      doesDataFlower: () => {
          return true;
      },
      floatingFilter: true,
      onFilterChanged: () => {
        let data = [],
          models = this.gridOptions.api.getModel().rowsToDisplay;
        __.forEach(models, (model) => {
          data.push(model.data);
        });
        this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(data));
        this.saveFilter = this.gridOptions.api.getFilterModel();
      },
    };
  }
  renderFooterData(data) {
    return [
      {
        gridType: 'footer',
        name: 'Total: ' + (data ? data.length : 0)
      }
    ];
  }
  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoices));
      this.gridOptions.api.hideOverlay();
    }
  }
  render() {
    if (Meteor.userId()) {
      let data = __.cloneDeep(this.props.data);
      if (data.loading) {
        return (
          <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{
              fontSize: 50
            }}></i>
          </div>
        )
      } else {
        __.forEach(data.invoies, item => {
          item.createdAt = moment(createdAt).format('DD/MM/YYYY');
        })
        let columnDefs = [
          {
            headerName: "",
            field: 'delete',
            minWidth: 56,
            width: 56,
            cellClass: 'agaction',
            pinned: 'left',
            filter: '',
            cellRendererFramework: DeleteButton,
            cellStyle: (params) => {
              if (params.node.data.gridType == 'footer') {
                return {display: 'none'};
              }
            },
            onCellClicked: (params) => {
              if (params.data && params.data._id) {
                this.props.cancelInvoice(Meteor.userId(), params.data._id).then(({data}) => {
                  if (data) {
                    this.props.data.refetch();
                  }
                })
              }
            }
          }, {
            headerName: "Mã đơn hàng",
            field: "code",
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
            headerName: "Ngày tạo",
            field: "createdAt",
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
            suppressMenu: true,
            cellRenderer: (params)=> {
              return moment(params.value).format('DD/MM/YYYY');
            }
          }, {
            headerName: "Tên khách hàng",
            field: "customer.name",
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
            headerName: "Email",
            field: "customer.email",
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
            headerName: "Số điện thoại",
            field: "customer.mobile",
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
            headerName: "Địa chỉ",
            field: "customer.address",
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
            headerName: "Trạng thái",
            field: "status",
            width: 100,
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
            suppressMenu: true,
            cellRenderer: (params)=> {
              let showText = '';
              if(params.value === 1)
                showText = "Đang xử  lý";
              if(params.value === 99)
                showText = "Đã duyệt";
              if(params.value === 100)
                showText = "Đã hủy";
              if(params.value === 101)
                showText = "Hoàn thành";
              return showText;
            }
          }, {
            headerName: "",
            field: 'verify',
            minWidth: 56,
            width: 56,
            cellClass: 'agaction',
            pinned: 'right',
            filter: '',
            cellRendererFramework: VerifyButton,
            cellStyle: (params) => {
              if (params.node.data.gridType == 'footer') {
                return {display: 'none'};
              }
            },
            onCellClicked: (params) => {
              if (params.data && params.data._id) {
                this.props.verifyInvoice(Meteor.userId(), params.data._id).then(({data}) => {
                  if (data) {
                    this.props.data.refetch();
                  }
                })
              }
            }
          }, {
            headerName: "",
            field: 'complete',
            minWidth: 56,
            width: 56,
            cellClass: 'agaction',
            pinned: 'right',
            filter: '',
            cellRendererFramework: CompleteButton,
            cellStyle: (params) => {
              if (params.node.data.gridType == 'footer') {
                return {display: 'none'};
              }
            },
            onCellClicked: (params) => {
              if (params.data && params.data._id) {
                this.props.completeInvoice(Meteor.userId(), params.data._id).then(({data}) => {
                  if (data) {
                    this.props.data.refetch();
                  }
                })
              }
            }
          },
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
                <a onClick={() => browserHistory.push('/category')}>Quản lý đơn hàng</a>
              </li>
            </ol>
            <div style={{
              height: this.state.height - 136
            }} className="ag-fresh">
              <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={data.invoices} enableColResize="true" enableSorting="true" enableFilter="true"/>
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
const INVOICE_QUERY = gql `
    query invoies {
        invoices {
					_id
					code
					status
					amount
					discount
					total
					createdAt
					shipFee
          customer {
            name
            email
            mobile
            address
          }
        }
}`

const CANCEL_INVOICE = gql`
    mutation cancelInvoice($userId: String!, $_id: String!){
        cancelInvoice(userId: $userId, _id: $_id)
}`

const VERIFY_INVOICE = gql`
    mutation verifyInvoice($userId: String!, $_id: String!){
        verifyInvoice(userId: $userId, _id: $_id)
}`

const COMPLETE_INVOICE = gql`
    mutation completeInvoice($userId: String!, $_id: String!){
        completeInvoice(userId: $userId, _id: $_id)
}`

export default compose(graphql(INVOICE_QUERY, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),graphql(CANCEL_INVOICE, {
    props: ({mutate})=> ({
        cancelInvoice: (userId, _id) => mutate({variables:{userId, _id}})
    })
}),
graphql(VERIFY_INVOICE, {
    props: ({mutate})=> ({
        verifyInvoice : (userId, _id) => mutate({variables:{userId, _id}})
    })
}),
graphql(COMPLETE_INVOICE, {
    props: ({mutate})=> ({
        completeInvoice : (userId, _id) => mutate({variables:{userId, _id}})
    })
}))(OrderDevoice);
