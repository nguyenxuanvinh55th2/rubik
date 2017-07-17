import React from 'react';

import { browserHistory } from 'react-router';
import __ from 'lodash';
import Dropzone from 'react-dropzone';
export class RenderImage extends React.Component {
  constructor(props) {
    super(props)
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.state = {
      filesImage: this.props.dataImages ? this.props.dataImages : []
    }
  }
  onDropAccepted(acceptedFiles,event) {
    let that = this;
    let filesImage = this.state.filesImage;
    if(acceptedFiles.length){
      __.forEach(acceptedFiles,(file,idx) =>{
        if(file.size <= 1024*1000*2){
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
              if(e.target.result){
                filesImage.push({
                      file:e.target.result,
                      fileName: file.name,
                      type: file.type
                    });
                that.setState({filesImage:filesImage});
              }
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
      });
    }
  }
  onDropRejected(rejectedFiles){
    if(rejectedFiles.length && rejectedFiles[0].size > 1024*1000*2){
      alert('File nhỏ hơn 2MB!');
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
                      <div style={{flexDirection:'column', margin:5}}>
                        <Dropzone style={{padding: 22, textAlign:'center', width: 150, height:120, border: '5px dashed #DDD', background: '#F8F8F8'}} onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected} accept="image/*" minSize={0} maxSize={1024*2*1000} multiple={true}>
                          <div>Kéo thả hoặc chọn ảnh</div>
                        </Dropzone>
                      </div>
                      {
                        __.map(stateData.filesImage, (file,idx) => {
                          return(
                            <div key={idx} style={{flexDirection:'column', margin:5,backgroundColor:'rgba(0, 0, 0, 0.4)',width: 150,height:120}}>
                                <img src={file.file} style={{width: '100%', height: 90, padding:0}}/>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', color:'rgb(255, 255, 255)'}} >
                                  <h5 style={{overflow:'hidden',textOverflow:'ellipsis', width: 120, whiteSpace: 'nowrap'}}>{file.fileName}</h5>
                                  <button type="button" className="btn btn-lg"
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
                                  </button>
                                </div>
                            </div>
                          )
                        })
                      }
                    </div>
              </div>
              <div className="modal-footer" style={{margin: 0}}>
                  <button type="button" className="btn btn-default" onClick={() => this.props.handleClose(this.state.filesImage)}>Thoát</button>
              </div>
          </div>
      </div>
    )
  }
}
