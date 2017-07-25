import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import accounting from 'accounting'
import moment from 'moment'
import { browserHistory } from 'react-router';
import InvoiceDetail from './InvoiceDetail.jsx';

class ChoseButton extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let { t, status, invoiceId, data } = this.props;
    return (
      <button className="btn btn-default" disabled={status === 99} style={{borderWidth: 0, width: 56, color: data._id === invoiceId ? 'red' : 'blue'}}>Chọn</button>
    )
  }
}

class OrderDevoice extends React.Component {
    constructor(props) {
        super(props);
        this.width = Math.floor((window.innerWidth - 100) / 29);
        this.state = {filterCol: 'code', height: window.innerHeight, width: this.width, rows: 29, setting: {storeManagement: null, general: null}, stockModel: 'abc', preventComponentUpdate: false, invoice: null};
        this.removeRows = [];
        this.error = false;

        this.gridOptions = {
            isFullWidthCell: (rowNode) => {
                return rowNode.level == 1;
            },
            getRowHeight: (params) => {
                return params.node.level == 1 ? 230 : 25;
            },
            doesDataFlower: () => {
                return true;
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
            onFilterChanged: () => {
                if (this.gridOptionFooter && this.gridOptionFooter.api) {
                    this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoices));
                }
            },
            icons: {
                groupExpanded: '<span style="width: 25px;height: 25px; text-align: center;margin-left: 8px;"><i style="font-weight: bolder;" class="fa fa-angle-down"></i></span>',
                groupContracted: '<span style="width: 25px;height: 25px; text-align: center;margin-left: 8px;"><i style="font-weight: bolder;" class="fa fa-angle-right"></i></span>',
            },
            enableFilter: true,
            floatingFilter: true,
            getRowStyle: (params) => {
              if (params.data.status === 99) {
                return {'color': 'red'};
              }
            },
        };
    }

    handleResize(e) {
        this.setState({width: this.width, height: window.innerHeight});
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.data.invoices) {
        this.setState({invoice: nextProps.data.invoices[0]});
      }
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
        this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.invoices));
      }
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    render() {
      console.log("message ", this.state.invoice);
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
                    headerName: "",
                    field: 'chose',
                    minWidth: 56,
                    width: 56,
                    maxWidth: 56,
                    cellClass: 'agaction',
                    pinned: 'left',
                    filter: '',
                    cellRendererFramework: ChoseButton,
                    cellStyle: (params) => {
                      if (params.node.data.gridType == 'footer') {
                        return {display: 'none'};
                      }
                    },
                    cellRendererParams: {invoiceId: this.state.invoice ? this.state.invoice._id : ''},
                    onCellClicked: (params) => {
                      this.setState({invoice: params.data});
                    }
                  },{
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
              // if (!stockManagement.fetchData) {
              //     setTimeout(()=>{
              //         stockManagementMutate({
              //             fetchData: true,
              //             stocks: data.stockManagement,
              //             setting: this.state.setting,
              //             colDefs: columnDefs
              //         });
              //     }, 500);
              // }
              // this.gridOptions.fullWidthCellRendererParams = {
              //   t: this.props.t
              // }
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
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{
                      height: this.state.height - 126,
                      width: '50%'
                    }} className="ag-fresh">
                      <AgGridReact
                        gridOptions={this.gridOptions}
                        columnDefs={columnDefs}
                        rowData={data.invoices}
                        enableColResize="true"
                        enableSorting="true"
                        enableFilter="true"
                      />
                    </div>
                    <div style={{
                      height: this.state.height - 126,
                      width: '50%',
                      padding: '15px'
                    }}>
                    {
                      this.state.invoice &&
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <div style={{width: '100%', textAlign: 'left'}}>
                          <h4>{'Mã hóa đơn: ' + this.state.invoice.code + (this.state.invoice.status === 99 ? ' (Đã duyệt)' : '')}</h4>&nbsp;
                          <h5>Tên khách hàng:&nbsp;<span style={{fontWeight: 'bold'}}>{this.state.invoice.customer.name}</span>&nbsp;Điện thoại:&nbsp;<span style={{fontWeight: 'bold'}}>{this.state.invoice.customer.mobile}</span></h5>
                          <h5>Ngày đặt:&nbsp;<span style={{fontWeight: 'bold'}}>{moment(this.state.invoice.createdAt).format('HH:mm DD/MM/YYYY')}</span>&nbsp;Email:&nbsp;<span style={{fontWeight: 'bold'}}>{this.state.invoice.customer.email}</span></h5>
                        </div>
                        <button className="btn btn-danger" disabled={this.state.invoice.status === 99} style={{borderWidth: 0, width: 100, height: 30}} onClick={() => {
                            console.log("message cancel");
                            this.props.cancelInvoice(Meteor.userId(), this.state.invoice._id).then(({data}) => {
                              if (data) {
                                this.setState({invoice: null});
                                this.props.data.refetch();
                              }
                            })
                          }}>
                          Hủy
                        </button>
                        <div style={{width:15}}>
                        </div>
                        <button className="btn btn-primary" style={{borderWidth: 0, width: 100, height: 30}}  onClick={() => {
                            let checkTotal = true;
                            __.forEach(this.state.invoice.invoiceDetails, item => {
                              if(item.countInStore < item.quantity) {
                                this.props.addNotificationMute({fetchData: true, message: 'Bạn không thể  duyệt khi đơn hàng tồn tại hàng hóa có số lượng đặt lớn hơn số lượng thực tế', level: 'warning'});
                                return;
                              }
                            })
                            if(this.state.invoice.status === 1) {
                              this.props.verifyInvoice(Meteor.userId(), this.state.invoice._id).then(({data}) => {
                                if (data) {
                                  let invoice = this.state.invoice;
                                  invoice.status = 99;
                                  this.setState({invoice});
                                  this.props.addNotificationMute({fetchData: true, message: 'Đơn hàng đã được duyệt', level: 'success'});
                                  this.props.data.refetch();
                                }
                              });
                            } else {
                                this.props.completeInvoice(Meteor.userId(), this.state.invoice._id).then(({data}) => {
                                  if (data) {
                                    let invoice = this.state.invoice;
                                    invoice.status = 101;
                                    this.props.addNotificationMute({fetchData: true, message: 'Giao hàng hoàn tất', level: 'success'});
                                    this.setState({invoice});
                                    this.props.data.refetch();
                                  }
                                });
                            }
                          }}>
                          {this.state.invoice.status === 1 ? 'Duyệt' : 'Hoàn thành'}
                        </button>
                      </div>
                    }
                    {
                      this.state.invoice &&
                      <div>
                        <div style={{height: this.state.height - 300, overflowY: 'auto'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', borderSpacing: 0, fontSize: 14, marginTop: 20}}>
                              <thead style={{color: '#8f8f8d'}}>
                                  <th style={{width: 110, textAlign: 'center'}}>Hình ảnh</th>
                                  <th style={{width: 110, textAlign: 'center'}}>Sản phẩm</th>
                                  <th style={{width: 145, textAlign: 'center'}}>Giá</th>
                                  <th style={{width: 145, textAlign: 'center'}}>Màu sắc</th>
                                  <th style={{width: 145, textAlign: 'center'}}>Sl tồn</th>
                                  <th style={{width: 100, textAlign: 'center'}}>Sl đặt</th>
                                  <th style={{width: 145, textAlign: 'center'}}>Tổng tiền</th>
                              </thead>
                              <tbody>
                              {
                                this.state.invoice.invoiceDetails.map((detail, idx) => (<InvoiceDetail key={idx} item={detail}/>))
                              }
                              </tbody>
                          </table>
                        </div>
                        <table style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <tfoot>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td style={{textAlign: 'center', fontWeight: 'bold', width: 300, textAlign: 'center'}}>{'Tổng tiền (chưa bao gồm phí ship Code)'}:&nbsp;</td>
                              <td style={{textAlign: 'center', fontWeight: 'bold', width: 100, textAlign: 'center'}}>{accounting.format(this.state.invoice.amount) + 'đ'}</td>
                            </tfoot>
                        </table>
                      </div>
                    }
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
    query invoices {
        invoices {
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
            color
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
