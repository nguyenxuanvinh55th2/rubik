import React from 'react';
import __ from 'lodash';

export default class AddNewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newInfo: {}, value: null};
  }
  getDataCombobox(field, value){
    if(value){
      let fieldData = __.find(this.props.columnDefs, {field});
      let data = __.find(fieldData.cellEditorParams.data, {_id: value});
      if(data){
        let newInfo = this.state.newInfo;
        if(field === 'country.name' || field === 'province.name' || field === 'city.name') {
          newInfo[field.replace('.name', '')] = {
            _id: data._id,
            code: data.code,
            name: data.name,
            parentID: data.parentID,
          };
        }
        this.setState({newInfo});
      }
      this.setState({value});
    }
  }
  renderInputField() {
    let { t } = this.props;
    let { value, newInfo } = this.state;
    let columnDefs = __.filter(this.props.columnDefs, item => {
      if(item.field && item.field !== 'option' && item.field !== 'index') {
        return true;
      } else {
          return false;
      }
    });
    let provinces = [];
    let cities = [];
    let that = this;
    return columnDefs.map((item, idx) => {
      let className = 'form-group'
      let note;
      if(item.required) {
        if(!this.state.newInfo[item.field] || this.state.newInfo[item.field] === '') {
          className = 'form-group has-error';
          note = 'Trường này là bắt buộc';
        } else {
            note = null;
        }
      }
      if(item.field === 'province.name' && !newInfo['country']) {
        return null;
      } else
          if(item.field === 'city.name' && !newInfo['province']) {
            return null
          } else {
              if(item.field === 'province.name') {
                provinces = __.filter(item.cellEditorParams.data, item => item.parentID === newInfo.country._id);
              } else
                  if(item.field === 'city.name') {
                    cities = __.filter(item.cellEditorParams.data, item => item.parentID === newInfo.province._id);
                  }
              return (
                <div key={idx} className={className}>
                    <label className="col-sm-3 control-label" style={{paddingRight: 0, textAlign: 'left'}}>{item.headerName}</label>
                    <div className="col-sm-9">
                      <input type={item.type === 'number' ? item.type : 'text'} className="form-control" min={item.min} max={item.max} value={this.state.newInfo[item.field] ? this.state.newInfo[item.field] : item.defaultValue ? item.defaultValue : ''} onChange={({target}) => {
                          let newInfo = this.state.newInfo;
                          if(item.max && item.min) {
                            if(parseInt(target.value) <= parseInt(item.max) &&  parseInt(target.value) >= parseInt(item.min)) {
                              newInfo[item.field] = target.value;
                              this.setState({newInfo});
                            }
                          } else {
                              newInfo[item.field] = target.value;
                              this.setState({newInfo});
                          }
                        }}/>
                        <span className="help-block">{note}</span>
                    </div>
                </div>
              )
          }
    })
  }
  render() {
    let { t, height } = this.props;
    let requiredList = __.filter(this.props.columnDefs, item => item.required);
    let dem = 0;
    let disabled = false;
    __.forEach(requiredList, item => {
      if(!this.state.newInfo[item.field.replace('.name', '')] || this.state.newInfo[item.field.replace('.name', '')] === '') {
        disabled = true;
      }
    })
    return (
      <div className="modal-content" style={{border: 0}}>
        <div className="modal-header">
          <h4 className="modal-title">{'Tạo' + ' ' + this.props.name}</h4>
        </div>
        <div className="modal-body" style={{height, overflowY: 'auto', overflowX: 'hidden'}}>
            <form className="form-horizontal">
              {this.renderInputField()}
            </form>
        </div>
        <div className="modal-footer" style={{margin: 0}}>
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.props.handleClose()}>Hủy</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.props.insertNew(this.state.newInfo)} disabled={disabled}>Lưu</button>
        </div>
      </div>
    )
  }
}
