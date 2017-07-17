import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import Popover from 'material-ui/Popover';
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
    let {node, showImage} = this.props;
    let { openTouch, anchorEl } = this.state;
      return (
        <div style={{width: '100%'}}>
          <button className="btn btn-default buton-grid" style={{borderWidth: 0, width: 56, padding: '3px 6px',color:'red'}}>Xóa</button>
          <button className="btn btn-default buton-grid" style={{borderWidth: 0, borderLeftWidth: 1, width: 24}} onTouchTap={this.handleTouchTap.bind(this)}><span className="fa fa-ellipsis-v" aria-hidden="true"></span></button>
          <Popover
              open={openTouch}
              anchorEl={anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'middle', vertical: 'top'}}
              onRequestClose={()=>this.setState({openTouch: false})}
          >
            <ul style={styles.list}>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false});}}>Cập nhật</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false});}}>Nhập hàng</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false});}}>Xuất hàng</li>
              <li style={styles.divider}></li>
              <li className="ag-action-item" style={styles.item} onClick={() => {this.setState({openTouch: false});}}>Mô tả</li>
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
              <div className="modal-body" style={{height: this.props.height, overflowY: 'auto', overflowX: 'hidden'}}>
                    <div style={{display: 'flex', flexDirection:'row', height:'auto', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                      {
                        __.map(stateData.filesImage, (file,idx) => {
                          return(
                            <div key={idx} style={{flexDirection:'column', margin:5,backgroundColor:'rgba(0, 0, 0, 0.4)',width: 150,height:120}}>
                                <img src={file.file} style={{width: '100%', height: 90, padding:0}}/>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', color:'rgb(255, 255, 255)'}} >
                                  <h5 style={{overflow:'hidden',textOverflow:'ellipsis', width: 120, whiteSpace: 'nowrap'}}>{file.fileName}</h5>
                                  {/* <button type="button" className="btn btn-lg"
                                    style={{minWidth: '30px', minHeight: '35px', height: '35px',
                                     margin: 0, boxShadow:'none', background:'none', padding: 0}}
                                     onClick={() => {
                                       var deleteImage = confirm("Bạn có muốn xóa ảnh này?");
                                       if (deleteImage == true) {
                                         if(this.props.handleDeleteImage)
                                            this.props.handleDeleteImage(idx);
                                       }
                                     }}>
                                    <span className="glyphicon glyphicon-remove"></span>&nbsp;
                                  </button> */}
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
