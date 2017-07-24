import React from 'react';
import moment from 'moment';
import __ from 'lodash';

import CustomDatePicker from './CustomDatePicker.jsx';
import InvoiceGrid from './InvoiceGrid.jsx';
import { browserHistory } from 'react-router';
class InvoiceManagement extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      bpm: {
        startDate: moment().startOf('day').valueOf(),
        endDate: moment().endOf('day').valueOf()
      },
      isChangeDate: false
    }
  }

  bpmChangeRange(value){
    this.setState({bpm: {
      startDate: value.startDate, endDate: value.endDate
    }})
  }

  render() {
    return (
      <div>
        <div className="breadcrumb" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 5, marginBottom: 0}}>
          <ol className="breadcrumb" style={{
            marginBottom: 0
          }}>
            <li>
              <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
            </li>
            <li>
              <a onClick={() => browserHistory.push('/invoiceManage')}>Quản lý đơn hàng</a>
            </li>
          </ol>
          <CustomDatePicker bpm={this.state.bpm} bpmChangeRange={this.bpmChangeRange.bind(this)} handleChange={() => {}}/>
        </div>
        <InvoiceGrid dateStart={this.state.bpm.startDate} dateEnd={this.state.bpm.endDate}/>
      </div>
    )
  }
}

export default InvoiceManagement;
