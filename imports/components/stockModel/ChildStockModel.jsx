import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import Popover from 'material-ui/Popover';
import QuillRender from '../editor/QuillRender.jsx';
import Cleave from 'cleave.js/react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
export class HanderEditorStockModel extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          open: false
      };
  }
  handleTouchTap(event){
      event.preventDefault();
      this.setState({
          openTouch: true,
          anchorEl: event.currentTarget,
      });
  }
  render(){
    let {node, showImage, showDescription, deleteStockModel, importStock, exportStock, updateStockModes} = this.props;
    let { openTouch, anchorEl } = this.state;
      return (
        <div style={{width: '100%'}}>
          <button className="btn btn-default buton-grid" style={{borderWidth: 0, width: 56, padding: '3px 6px',color:'red'}} onClick={() => deleteStockModel(node)}>Xóa</button>
          <button className="btn btn-default buton-grid" style={{borderWidth: 0, borderLeftWidth: 1, width: 24}} onTouchTap={this.handleTouchTap.bind(this)}><span className="fa fa-ellipsis-v" aria-hidden="true"></span></button>
          <Popover
              open={openTouch}
              anchorEl={anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'middle', vertical: 'top'}}
              onRequestClose={()=>this.setState({openTouch: false})}
          >
            <ul style={styles.list}>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false}); updateStockModes(node);}}>Cập nhật</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false}); importStock(node)}}>Nhập hàng</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false}); exportStock(node)}}>Xuất hàng</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false}); showDescription(node)}}>Mô tả</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false}); showImage(node)}}>Hình ảnh</li>
              <li style={styles.divider}></li>
            </ul>
          </Popover>
      </div>);
  }
}
const styles = {
    list: {
        listStyle: 'none',
        margin: 0,
        padding: '5px 0'
    },
    item: {
        padding: '1px 10px'
    },
    divider:{
        backgroundColor: '#ededed',
        margin: '4px 1px',
        height: 1
    }
};
export class RenderImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filesImage: this.props.dataImages ? this.props.dataImages : []
    }
  }
  render(){
    let stateData = this.state;
    return(
      <div className="modal-dialog modal-lg" style={{width: 'auto', margin: 0}}>
          <div className="modal-content">
              <div className="modal-header">
                  <h4 className="modal-title">Quản lý files</h4>
              </div>
              <div className="modal-body" style={{height: this.props.heigh, overflowY: 'auto', overflowX: 'hidden'}}>
                    <div style={{display: 'flex', flexDirection:'row', height:'auto', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                      {
                        __.map(stateData.filesImage, (file,idx) => {
                          return(
                            <div key={idx} style={{flexDirection:'column', margin:5,backgroundColor:'rgba(0, 0, 0, 0.4)',width: 150,height:120}}>
                                <img src={file.file} style={{width: '100%', height: 90, padding:0}}/>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', color:'rgb(255, 255, 255)'}} >
                                  <h5 style={{overflow:'hidden',textOverflow:'ellipsis', width: 120, whiteSpace: 'nowrap'}}>{file.fileName}</h5>
                                </div>
                            </div>
                          )
                        })
                      }
                    </div>
              </div>
              <div className="modal-footer" style={{margin: 0}}>
                  <button type="button" className="btn btn-default" onClick={() => this.props.handleClose()}>Thoát</button>
              </div>
          </div>
      </div>
    )
  }
}

export class RenderDescription extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div className="modal-dialog" style={{width: 'auto', margin: 0}}>
          <div className="modal-content">
              <div className="modal-header">
                  <h4 className="modal-title">Mô tả</h4>
              </div>
              <div className="modal-body" style={{height: this.props.height, overflowY: 'auto', overflowX: 'hidden'}}>
                <QuillRender value={this.props.description}/>
              </div>
              <div className="modal-footer" style={{margin: 0}}>
                  <button type="button" className="btn btn-default" onClick={() => this.props.handleClose()}>Thoát</button>
              </div>
          </div>
      </div>
    )
  }
}
export class UpdateQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      reason: '',
      averagePrice: 0, price: 0, isPromotion: false, saleOff: 0
    }
  }
  handleSave(){
    let info = {};
    let detail = []
    if(this.props.type == 'import'){
      info.quantity = parseInt(this.props.data.quantity) + parseInt(this.state.quantity);
    }
    else {
      info.quantity = parseInt(this.props.data.quantity) - parseInt(this.state.quantity);
    }
    if(info.quantity > 0){
      if(this.props.type == 'export'){
        alert("Không đủ hàng để xuất bán!")
      }
    }
    else {
      info.detail = detail.push({
        reason: this.state.reason,
        createdAt: moment().valueOf()
      });
      StockModels.update({_id: this.props.data._id}, {$set: info }, (error) => {
        if(error){
          throw error;
          this.props.addNotificationMute({fetchData: true, message: 'Cập nhập thất bại', level:'error'});
          this.props.handleClose();
          this.props.refeshData();
        }
        else {
          this.props.addNotificationMute({fetchData: true, message: 'Cập nhập thành công', level:'success'});
          this.props.handleClose();
          this.props.refeshData();
        }
      })
    }
  }
  render(){
    return(
      <div className="modal-dialog" style={{width: 'auto', margin: 0}}>
          <div className="modal-content">
              <div className="modal-header">
                  <h4 className="modal-title">{this.props.type == 'export' ? 'Xuất bán' : 'Nhập hàng'}</h4>
              </div>
              <div className="modal-body" style={{height: this.props.height, overflowY: 'auto', overflowX: 'hidden'}}>
                <form className="form-horizontal">
                  <div className="form-group">
                    <label className="control-label col-sm-3">Số lượng</label>
                    <div className="col-sm-9">
                      <Cleave className="form-control" style={{textAlign: 'right'}}
                         value={this.state.quantity}  options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                         onFocus={({target}) => { if(target.value === '0') { target.value = '' } }}
                         onChange={({target}) => {
                          this.setState((prevState) => {
                            prevState.quantity = target.value;
                            return prevState;
                          });
                      }}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-3">Mô tả</label>
                    <div className="col-sm-9">
                      <textarea rows="4" type="text" className="form-control" style={{textAlign: 'right'}} value={this.state.reason}
                        onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.reason = target.value;
                          return prevState;
                        });
                      }}/>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer" style={{margin: 0}}>
                  <button type="button" className="btn btn-default" onClick={() => this.props.handleClose()}>Thoát</button>
                  <button type="button" className="btn btn-primary" disabled={!this.state.quantity || !this.state.reason} onClick={() => this.handleSave()}>Lưu</button>
              </div>
          </div>
      </div>
    )
  }
}
