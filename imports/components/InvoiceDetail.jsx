import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 2;
    this.width = Math.floor((window.innerWidth - 99) / this.rows);
    this.state = {
        width: this.width,
        open: false,
        obCountryData : null,
        type: '',
        typeName: '',
        filterCol: "name",
        parentID: '',
        countrySelected: null,
      }
      this.gridOptions = {
        suppressHorizontalScroll: true,
        slaveGrids: [],
          icons: {
              groupExpanded: '<i style="font-weight: bolder;width: 25px;height: 25px; text-align: center;padding-top: 5px;" class="fa fa-angle-down"></i>',
              groupContracted: '<i style="font-weight: bolder;width: 25px;height: 25px; text-align: center;padding-top: 5px;" class="fa fa-angle-right"></i>',
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
          }
      };
  }

  handleResize(e) {
      this.width = Math.floor((window.innerWidth - 99) / this.rows);
      this.setState({width: this.width});
  }

  componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render() {
    let { t } = this.props.data;
    let country;
    if(this.props.data.country) {
      country = __.filter(this.props.countries, item => item._id === this.props.data.country._id);
    }
    let columnDefs = [
        {
          headerName: '', pinned: 'left', width: 40, cellStyle: {cursor: 'pointer', padding: 0, textAlign: 'center'}, suppressNavigable: true,
          suppressMenu: true, cellRenderer: 'group', cellRendererParams: { suppressCount: true }, cellClass: "group-action-grid",
        },
        {
          headerName: t('srm:common.labelCode'), field: "code", width: this.state.width, filter: 'text', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']},
          cellStyle: (params) => {
            if (params.data.type === 'province') {
              return {textAlign:'center', paddingRight:'30px'};
            } else
                if (params.data.type === 'city') {
                  return {textAlign:'right', paddingRight:'30px'}
            }
          }
        },
        {
          headerName: t('srm:common.labelName'), field: "name", width: this.state.width, filter: 'text', filterParams: {filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']},
          cellStyle: (params) => {
            if (params.data.type === 'province') {
              return {textAlign:'center', paddingRight:'30px'};
            } else
                if (params.data.type === 'city') {
                  return {textAlign:'right', paddingRight:'30px'}
            }
          }
        },
    ];
    if(country && country.length > 0) {
      let data = __.cloneDeep(country);
      data[0]['isparent'] = true;
      data[0]['children'] = country[0].provinces;
      __.forEach(data[0].children, item => {
        item['isparent'] = true;
        item['children'] = item.cities;
      })
      return (
        <Tabs style={{paddingLeft: 49, height: 150}}>
            <TabList style={{margin: 0}}>
                <Tab>{t('srm:country.labelCountry')}</Tab>
            </TabList>
            <TabPanel>
                <div style={{height: 125}} className="ag-fresh">
                  <AgGridReact
                    gridOptions={this.gridOptions}
                    columnDefs={columnDefs}
                    rowData={data}
                    enableColResize="true"
                    enableSorting="true"
                    enableFilter="true"
                    animateRows= "true"
                  />
                </div>
            </TabPanel>
        </Tabs>
      )
    } else {
        return (
          <Tabs style={{paddingLeft: 49, height: 150}}>
              <TabList style={{margin: 0}}>
                  <Tab>{t('srm:country.labelCountry')}</Tab>
              </TabList>
              <TabPanel>
                  {t('srm:common.notificationNoInfoToShow')}
              </TabPanel>
          </Tabs>
        )
    }
  }
}

export default InvoiceDetail;
