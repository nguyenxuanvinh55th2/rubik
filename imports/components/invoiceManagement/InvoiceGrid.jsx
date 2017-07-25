import React from 'react';
import __ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';

class InvoiceGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: window.innerHeight};
    this.gridOptions = {
        onGridReady: () => {
          if(this.gridOptions && this.gridOptions.api) {
            this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoicesByDate));
            this.gridOptions.api.sizeColumnsToFit();
          }
        },
        enableFilter: true,
        floatingFilter: true,
    };
  }

  handleResize(e) {
      this.setState({width: this.width, height: window.innerHeight});
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
  }

  renderFooterData(data) {
    return [
      {
        gridType: 'footer',
        code: 'Total: ' + (data ? data.length : 0)
      }
    ];
  }

  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoicesByDate));
    }
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoicesByDate));
      this.gridOptions.api.sizeColumnsToFit();
    }
    window.addEventListener('resize', this.handleResize.bind(this));
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
            let columnDefs= [
                {
                  headerName: "Mã đơn hàng",
                  field: "code",
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
                  suppressMenu: true
                },{
                  headerName: "Tổng tiền",
                  field: "amount",
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
                  suppressMenu: true
                }, {
                  headerName: "Tên khách hàng",
                  field: "customer.name",
                  width: 150,
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
                  suppressMenu: true
                }, {
                  headerName: "Email",
                  field: "customer.email",
                  width: 200,
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
                  onCellClicked: (params) => {
                    this.setState({invoice: params.data});
                  },
                  filter: 'text',
                  suppressMenu: true
                }, {
                  headerName: "Số điện thoại",
                  field: "customer.mobile",
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
                  onCellClicked: (params) => {
                    this.setState({invoice: params.data});
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
                  onCellClicked: (params) => {
                    this.setState({invoice: params.data});
                  },
                  filterParams: {
                    filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
                  },
                  filter: 'text',
                  suppressMenu: true
                }, {
                  headerName: "Ngày tạo",
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
                  onCellClicked: (params) => {
                    this.setState({invoice: params.data});
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
                }
            ];
            return (
              <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <div style={{
                    height: this.state.height - 136,
                    width: '100%'
                  }} className="ag-fresh">
                    <AgGridReact
                      gridOptions={this.gridOptions}
                      columnDefs={columnDefs}
                      rowData={data.invoicesByDate}
                      enableColResize="true"
                      enableSorting="true"
                      enableFilter="true"
                    />
                  </div>
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
    query invoicesByDate($dateStart: Float, $dateEnd: Float) {
        invoicesByDate(dateStart: $dateStart, dateEnd: $dateEnd) {
					_id
					code
					status
					amount
					total
					createdAt
					shipFee
          customer {
            name
            email
            mobile
            address
          }
          invoiceDetails {
						_id
						stockModel {
							_id
							code
	            name
							quantity
							saleOff
							isPromotion
							images {
								_id
								file
							}
	            price
							description
						}
						quantity
						amount
            countInStore
					}
        }
}`

export default compose(graphql(INVOICE_QUERY, {
  options: (ownProps) => ({
    variables: { dateStart: ownProps.dateStart, dateEnd: ownProps.dateEnd },
    fetchPolicy: 'network-only'
  })
}))(InvoiceGrid);
