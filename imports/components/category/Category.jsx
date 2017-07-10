import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Meteor } from 'meteor/meteor';
import __ from 'lodash';

import AddNewDialog from './AddNewDialog.jsx';

class RemoveButton extends React.Component {
    remove() {
        var remove = confirm('Bạn có thật sự muốn xóa trường này');
        if (remove == true) {
            let userId = Meteor.userId();
            this.props.data.remove('0', this.props.data._id).then(() => {
                this.props.data.refetch();
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });
        }
    }

    render() {
        if(this.props.data.gridType === 'footer') {
            return(
                <div></div>
            )
        } else {
            return <button className="btn btn-default" style={{borderWidth: 0, width: 34, color: 'red', padding: 0, marginLeft: -5}} onClick={() => this.remove()}>Xóa</button>
        }
    }
}

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.width = window.innerWidth - 69;
        this.state = {filterCol: 'name', height: window.innerHeight, width: this.width, open: false, categorySelected: {}};
        this.removeRows = [];
        this.error = false;

        this.gridOptions = {
            suppressHorizontalScroll: true,
            doesDataFlower: () => {
                return true;
            },
            onFilterChanged: () => {
                if (this.gridOptionFooter) {
                    this.gridOptionFooter.api.setRowData(this.renderFooterData());
                }
                this.saveFilter = this.gridOptions.api.getFilterModel();
            },
            suppressHorizontalScroll: true,
            slaveGrids: [],
            floatingFilter: true
        };

        this.gridOptionFooter = {
            onColumnEverythingChanged: (params) => {
                this.gridOptionFooter.api.sizeColumnsToFit();
            },
            onGridReady: (params) => {
                this.gridOptionFooter.api.setRowData(this.renderFooterData());
            },
            rowData: null,
            rowClass: 'bold-row',
            headerHeight: 0,
            slaveGrids: []
        };

        this.gridOptions.slaveGrids.push(this.gridOptionFooter);
        this.gridOptionFooter.slaveGrids.push(this.gridOptions);
    }

    clearAllFilter() {
        document.getElementById('input-search').value = null;
        this.gridOptions.api.setFilterModel(null);
        this.gridOptions.api.onFilterChanged();
    }

    filterObject(data, label, value) {
        let model = [];
        __.forEach(data, (item) => {
            if (__.lowerCase(item[label]).includes(__.lowerCase(value))) {
                model.push(item[label]);
            }
        });
        return model;
    }

    handleToggle(category) {
        this.setState({open: !this.state.open});
        this.setState({categorySelected: category})
    }

    handleClose() {
        this.setState({open: false});
    }


    handleResize(e) {
        this.setState({height: window.innerHeight});
        this.width = window.innerWidth - 69;
        this.setState({width: this.width})
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    onChangeFilter(value) {
        let model;
        let filterComponent = this.gridOptions.api.getFilterInstance(this.state.filterCol);
        if (!value) {
            this.gridOptions.api.setFilterModel(null);
            this.gridOptions.api.onFilterChanged();
        } else {
            model = this.filterObject(this.props.data.categories, this.state.filterCol, value);
            filterComponent.setModel(model);
            this.gridOptions.api.onFilterChanged();
        }
    }

    RefreshData() {
        this.props.data.refetch().then(() => {
            let categoryId = this.state.categorySelected._id;
            if(categoryId) {
                let category = __.filter(this.props.data.categories, item => item._id === categoryId)[0];
                this.setState({categorySelected: category});
            }
        });
    }

    renderFooterData() {
        let totalAmount = 0, totalStt = 0;

        if (this.gridOptions && this.gridOptions.api) {
            let data = [], models;
            models = this.gridOptions.api.getModel().rowsToDisplay;
            __.forEach(models, (model) => {
                data.push(model.data);
            });
            __.forEach(data, (tran)=>{
                totalStt++;
                totalAmount += tran.amount;
            });
        }

        return [{
            gridType: 'footer',
            name: 'Total: ' +  totalStt,
            option: ''
        }];
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    addNewRow(category) {
      let { data } = this.props;
      let userId = Meteor.userId();
      category.active = true;
      category.isCategory = true;
      let info = JSON.stringify(category)
      this.props.insertCategories('0', info).then(() => {
          this.props.data.refetch();
      }).catch((error) => {
          console.log('there was an error sending the query', error);
      });
      this.handleClose();
    }

    render() {
        let {layouts, users, t} = this.props;
        let data = __.cloneDeep(this.props.data);
        //if (Meteor.userId()) {
            if (data.loading) {
                return (
                    <div className="spinner spinner-lg"></div>
                );
            } else {
                __.forEach(data.categories, item => {
                    item['remove'] = this.props.removeCategories;
                    item['refetch'] = this.props.data.refetch;
                    item['t'] = this.props.t;
                });
                let columnDefs= [
                    {
                        cellRendererFramework: RemoveButton, headerName: "", field: "option", cellClass: 'agaction',
                        minWidth: 34, width: 34, maxWidth: 34, editable: false, suppressMenu: true, filterParams: {filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']}, filter: ''
                    },
                    {
                        headerName: "Tên chủng loại", field: "name", width: this.state.width, cellStyle: function(params) {
                                if (params.node.data.gridType == 'footer') {
                                    //mark police cells as red
                                    return {fontWeight: 'bold'};
                                } else {
                                    return null;
                                }
                        }, filterParams: {filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']}, filter: 'text', suppressMenu: true, required: true
                    }
                ];
                return (
                    <div>
                      <div>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                              <div></div>
                              <div>
                                  <button className="btn btn-primary" data-toggle="modal" data-target="#myModal" style={{marginRight: 5}}>Tạo mới</button>
                              </div>
                          </div>
                          <div style={{height: 36, display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', border: '1px solid #d1d1d1', borderBottom: 'none', padding: 5, position: 'relative', justifyContent: 'space-between'}}>
                              <div></div>
                              <div>
                                  <i className="fa fa-refresh" aria-hidden="true" style={{fontSize: 22, cursor: 'pointer'}}
                                      onClick={() => this.RefreshData()}></i>
                              </div>
                          </div>
                          <div style={{height: this.state.height-193 + 40}} className="ag-fresh">
                              <AgGridReact
                                  gridOptions={this.gridOptions}
                                  columnDefs={columnDefs}
                                  rowData={data.categories}
                                  enableColResize="true"
                                  enableSorting="true"
                                  enableFilter="true"
                              />
                          </div>
                          <div style={{height: 45}} className="ag-fresh">
                              <AgGridReact
                                  rowClass="grid-bottom"
                                  gridOptions={this.gridOptionFooter}
                                  columnDefs={columnDefs}
                                  rowData={this.renderFooterData()}
                                  enableColResize="true"
                              />
                          </div>
                          <div id="myModal" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                              {
                                <AddNewDialog {...this.props} columnDefs={columnDefs} insertNew={this.addNewRow.bind(this)} handleClose={this.handleClose.bind(this)} height={150} name={'Tạo chủng loại'}/>
                              }
                            </div>
                          </div>
                      </div>
                    </div>
                )
            }
        // } else {
        //     return <div style={{textAlign: 'center'}}>{'Bạn cần đăng nhập để xem thông tin này'}</div>;
        // }
    }
}
