export default class OrderDevoice extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      height: window.innerHeight,
      open: false,
      name: ''
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
            cellRendererFramework: <button className="btn btn-default" style={{color: 'red'}}>Hủy</button>,
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
            suppressMenu: true
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
            headerName: "",
            field: 'verify',
            minWidth: 56,
            width: 56,
            cellClass: 'agaction',
            pinned: 'left',
            filter: '',
            cellRendererFramework: <button className="btn btn-primary">Duyệt</button>
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
              height: this.state.height - 167
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



export default compose (
    graphql(STOCK_CATEGORY_QUERY, {
        options: ()=> ({
            variables: {},
            fetchPolicy: 'network-only'
        })
    }),
    graphql(REMOVE_STOCK_CATEGORY, {
        props: ({mutate})=> ({
            removeCategories : (userId, _id) => mutate({variables:{userId, _id}})
        })
    }),
    graphql(INSERT_STOCK_CATEGORY, {
        props: ({mutate})=> ({
            insertCategories : (userId, info) => mutate({variables:{userId, info}})
        })

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
    }))(OrderDevoice);
