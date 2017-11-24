import React from 'react';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';
import __ from 'lodash';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {SketchPicker, CirclePicker} from 'react-color';
import Dialog from 'material-ui/Dialog';
class Colors extends React.Component {
  constructor(props) {
    super(props)
    this.data = [];
    this.state = {
      height: window.innerHeight,
      open: false,
      name: '',  color: '',  image: {}, isColor: true, isBasicColor: true, displayColorPicker: false
    }
  }
  handleAddImage(files){
    let that = this;
    if(files[0]){
      let file = files[0];
      if(file.size <= 1024*1000*2){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            if(e.target.result){
              that.setState({image:{
                file:e.target.result,
                fileName: file.name,
                type: file.type
              }});
            }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        alert('File nhỏ hơn 2MB!');
      }
    }
  }
  handleChange = (color) => {
    this.setState((prevState) => {
      prevState.color = color.hex;
      // prevState.displayColorPicker = false;
      return prevState;
    })
  }
  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker
    })
  }
  handleSaveColor(){
    if(this.state.isBasicColor){
      if(this.state.name && this.state.color){
        let info = {
          data: {
            name: this.state.name,
            color: this.state.color,
            isBasicColor: this.state.isBasicColor,
            isColor: true,
            active: true
          }
        }
        if(this.props.insertColor){
          this.props.insertColor(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
            if(data){
              this.props.addNotificationMute({fetchData: true, message: 'Thêm thành công', level: 'success'});
              this.setState({open: false});
              console.log(this.props.data);
              this.props.data.refetch();
            }
          })
          .catch((error) => {
            this.props.addNotificationMute({fetchData: true, message: 'Thêm thất bại', level: 'error'});
            this.setState({open: false});
            this.props.data.refetch();
          })
        }
      }
    }
    else {
      if(this.state.name && this.state.image){
        let info = {
          data: {
            name: this.state.name,
            color: this.state.color,
            isBasicColor: this.state.isBasicColor,
            isColor: true,
            active: true
          },
          image: this.state.image
        }
        if(this.props.insertColor){
          this.props.insertColor(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
            if(data){
              this.props.addNotificationMute({fetchData: true, message: 'Thêm thành công', level: 'success'});
              this.setState({open: false});
              this.props.data.refetch();
            }
          })
          .catch((error) => {
            this.props.addNotificationMute({fetchData: true, message: 'Thêm thất bại', level: 'error'});
            this.setState({open: false});
            this.props.data.refetch();
          })
        }
      }
    }
  }
  handleDownload(){
    __.forEach(this.props.data.colors,(color) => {
      if(color.image.file){
        var link = document.createElement("a");
        link.download = color.image._id;
        link.href = color.image.file;
        link.click();
      }
    })
 }
  render(){
    let {data} = this.props;
    if (Meteor.userId()) {
      if (!data.colors) {
        return (
          <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{
              fontSize: 50
            }}></i>
          </div>
        )
      } else {
        const styles = {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: this.state.color
          },
          swatch: {
            marginLeft: 10,
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer'
          },
          popover: {
            position: 'absolute',
            zIndex: '2'
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }
        }
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <ol className="breadcrumb" style={{
                marginBottom: 0
              }}>
                <li>
                  <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
                </li>
                <li>
                  <a onClick={() => browserHistory.push('/colors')}>Màu sắc</a>
                </li>
                {
                  Meteor.userId() == '0' ?
                  <li>
                    <a onClick={() => this.handleDownload()}>Downloads Images</a>
                  </li>
                  : null
                }
              </ol>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
                <button type="button" className="btn btn-primary" onClick={() => {
                  this.setState({open: true})
                }}>Thêm mới</button>
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{width: 30}}></th>
                  {/* <th style={{width: 30}}></th> */}
                  <th style={{width: 200}}>Tên</th>
                  <th>Màu</th>
                </tr>
              </thead>
              <tbody>
                {
                  __.map(data.colors, (color, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <button type="button" className="btn btn-danger" onClick={() => {
                            var deleteImage = confirm("Bạn có muốn màu này?");
                            if (deleteImage == true) {
                              if(this.props.removeColor){
                                this.props.removeColor(Meteor.userId(), color._id).then(({data}) => {
                                  this.props.addNotificationMute({fetchData: true, message: 'Thành công', level: 'success'});
                                  this.props.data.refetch();
                                })
                                .catch((error) => {
                                  this.props.addNotificationMute({fetchData: true, message: 'Thất bại', level: 'error'});
                                  this.props.data.refetch();
                                })
                              }
                            }
                          }}>
                            Xóa
                          </button>
                        </td>
                        {/* <td>
                          <button type="button" className="btn btn-primary">
                            Cập nhật
                          </button>
                        </td> */}
                        <td>{color.name}</td>
                        <td>
                          {
                            color.isBasicColor ?
                            <div style={{height: 40, width: 40, backgroundColor: color.color}}></div>
                            :
                            <img src={color.image.file ? color.image.file : ''} style={{height: 40, width: 40}}/>
                          }
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <Dialog modal={true} open={this.state.open} bodyStyle={{
              padding: 0
            }} contentStyle={{
              width: 500, height: '90%'
            }}>
              <div className="modal-dialog" style={{
                width: 'auto',
                margin: 0
              }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Tạo mới màu sắc </h4>
                  </div>
                  <div className="modal-body" style={{height: window.innerHeight - 250 , overflowY: 'auto',  overflowX: 'hidden'}}>
                    <form className="form-horizontal">
                      <div className="form-group">
                        <label className="control-label col-sm-3">Tên màu</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={this.state.name} onChange={({target}) => {
                            this.setState({name: target.value})
                          }}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                          <div className="checkbox">
                           <label><input type="checkbox" checked={this.state.isBasicColor} onChange={(event) => this.setState({isBasicColor: !this.state.isBasicColor})}/>{!this.state.isBasicColor ? 'Màu theo hình ảnh' : 'Màu cơ bản'}</label>
                         </div>
                        </div>
                      </div>
                      {
                        this.state.isBasicColor ?
                        <div className="form-group">
                          <label className="control-label col-sm-3">Chọn màu<span></span></label>
                          <div className="col-sm-9">
                            <div style={styles.swatch} onClick={() => this.handleClick()}>
                              <div style={styles.color}></div>
                            </div>
                            {this.state.displayColorPicker
                              ? <div style={styles.popover}>
                                  <div style={styles.cover} onClick={()  => this.setState({displayColorPicker: !this.state.displayColorPicker})}/>
                                  <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                                </div>
                              : null}
                          </div>
                        </div>
                        :
                        <div>
                          <div className="form-group">
                            <label className="control-label col-sm-3">Chọn hình</label>
                            <div className="col-sm-9">
                              <input type="file" name="pic" accept="image/*" multiple={false} onChange={({target}) => this.handleAddImage(target.files)}/>
                            </div>
                          </div>
                          {
                            this.state.image && this.state.image.file &&
                            <div className="form-group">
                              <div className="col-sm-offset-3 col-sm-9">
                                <img src={this.state.image.file} style={{height: 50, width: 50}}/>
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={() => this.setState({open: false})}>Đóng</button>
                    <button type="button" className="btn btn-primary" onClick={() => this.handleSaveColor()}>Lưu</button>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        )
      }
    }
    else {
      return <div style={{
        textAlign: 'center'
      }}>{'Vui lòng đăng nhập'}</div>;
    }
  }
}
const STOCK_COLORS = gql `
    query colors{
      colors {
          _id name  color isBasicColor image {
            _id fileName file
          }
      }
}`

const REMOVE_COLOR = gql `
    mutation removeColor($userId: String!, $_id: String!){
        removeColor(userId: $userId, _id: $_id)
}`

const INSERT_COLOR = gql `
    mutation insertColor($userId: String!, $info: String!){
        insertColor(userId: $userId, info: $info)
}`
const INSERT_FILE = gql `
    mutation insertFiles($userId: String!, $info: String!){
        insertFiles(userId: $userId, info: $info)
}`

export default compose(graphql(STOCK_COLORS, {
  options: () => ({variables: {}, fetchPolicy: 'network-only'})
}), graphql(REMOVE_COLOR, {
  props: ({mutate}) => ({
    removeColor: (userId, _id) => mutate({
      variables: {
        userId,
        _id
      }
    })
  })
}), graphql(INSERT_COLOR, {
  props: ({mutate}) => ({
    insertColor: (userId, info) => mutate({
      variables: {
        userId,
        info
      }
    })
  })
}), graphql(INSERT_FILE, {
  props: ({mutate}) => ({
    insertFiles: (userId, info) => mutate({
      variables: {
        userId,
        info
      }
    })
  })
}))(Colors);
