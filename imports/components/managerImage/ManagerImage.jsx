import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import {Meteor} from 'meteor/meteor';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
import {browserHistory} from 'react-router';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class UpdateImage extends React.Component {
  constructor(props) {
    super(props)
    let data = [];
    __.forEach(this.props.categories, (category) => {
      data.push({
        _id: category._id,
        name: category.name,
        type : 'category'
      })
    });
    __.forEach(this.props.stockTypes, (category) => {
      data.push({
        _id: category._id,
        name: category.name,
        type: 'stockType'
      })
    });
    this.dataType = data;
    this.state ={
      _id: this.props.sliderSlected._id,
      image: this.props.sliderSlected.image,
      type: this.props.sliderSlected.type
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
  handleSave(){
    if(this.state.image){
      let info = {
        data: {
          active: true,
          isFindingType: true,
          type: this.state.type
        },
        image: this.state.image
      }
      if(this.state._id){
        if(this.props.updateSlider){
          this.props.updateSlider(Meteor.userId(),this.state._id, JSON.stringify(info)).then(({data}) => {
            if(data){
              this.props.addNotificationMute({fetchData: true, message: 'Thành công', level: 'success'});
              this.props.handleClose();
              this.props.refetch();
            }
          })
          .catch((error) => {
            this.props.addNotificationMute({fetchData: true, message: 'Thất bại', level: 'error'});
            this.props.handleClose();
            this.props.refetch();
          })
        }
      }
      else {
        if(this.props.insertSlider){
          this.props.insertSlider(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
            if(data){
              this.props.addNotificationMute({fetchData: true, message: 'Thành công', level: 'success'});
              this.props.handleClose();
              this.props.refetch();
            }
          })
          .catch((error) => {
            this.props.addNotificationMute({fetchData: true, message: 'Thất bại', level: 'error'});
            this.props.handleClose();
            this.props.refetch();
          })
        }
      }
    }
  }
  render(){
    return (
      <div className="modal-dialog" style={{
        width: 'auto',
        margin: 0
      }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Tạo/ chỉnh sửa hình ảnh</h4>
          </div>
          <div className="modal-body" style={{height: window.innerHeight - 250 , overflowY: 'auto',  overflowX: 'hidden'}}>
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-sm-3">Chọn kiểu</label>
                <div className="col-sm-9">
                  <Select name="form-field-name" value={this.state.type._id
                    ? this.state.type._id
                    : ''} valueKey="_id" labelKey="name" options={this.dataType} placeholder="Gõ để chọn loại hàng hoặc chủng loại" onChange={(value) => {
                    this.setState((prevState) => {
                      prevState.type = value ? value : {};
                      return prevState;
                    })
                  }}/>
                </div>
              </div>
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
                      <img src={this.state.image.file} style={{height: 100, width: 100}}/>
                    </div>
                  </div>
                }
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={() => this.props.handleClose()}>Đóng</button>
            <button type="button" className="btn btn-primary" disabled={!this.state.image.file || !this.state.type._id} onClick={() => this.handleSave()}>Lưu</button>
          </div>
        </div>
      </div>
    )
  }
}

class ManagerImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      sliderSlected: {
        _id: '', image: {}, type: {}
      }
    }
  }
  render(){
    if(!this.props.data.sliders){
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-spin" style={{
            fontSize: 50
          }}></i>
        </div>
      )
    }
    else {
      return (
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <ol className="breadcrumb" style={{
              marginBottom: 0
            }}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/managerImage')}>Quản lý hình ảnh</a>
              </li>
            </ol>
          {
            this.props.data.sliders.length < 4 ?
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
              <button type="button" className="btn btn-primary" onClick={() => {
                this.setState({open: true})
              }}>Thêm mới</button>
            </div>
            : null
          }
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
            {
                __.map(this.props.data.sliders, (slide, idx) => {
                  return (
                    <div key={idx} className="col-sm-3" style={{padding: 5}}>
                      <div className="panel panel-default" style={{height: window.innerHeight - 170}}>
                        <div className="panel-body">
                          <img className="img-responsive" src={slide.image && slide.image.file ? slide.image.file : ''} style={{width: '100%', height: window.innerHeight - 270}}/>
                          <p style={{textAlign: 'center', textTransform: 'uppercase'}}>{slide.type.name}</p>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <button type="button" className="btn btn-danger" onClick={() => {
                              if(confirm("Xóa hình mẫu này!")){
                                Sliders.remove(slide._id, (error) => {
                                  if(error){
                                    throw error;
                                  }
                                  else {
                                    this.props.data.refetch();
                                  }
                                })
                              }
                            }}>Xóa</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                              this.setState({open: true, sliderSlected: slide})
                            }}>Sửa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          <Dialog modal={true} open={this.state.open} bodyStyle={{
            padding: 0
          }} contentStyle={{
            width: 500, height: '90%'
          }}>
          <UpdateImage {...this.props} sliderSlected={this.state.sliderSlected} handleClose={() => this.setState({open: false,   sliderSlected: {
              _id: '', image: {}, type: {}
            }})} refetch={() => this.props.data.refetch()} stockTypes={this.props.data.stockTypes} categories={this.props.data.categories}/>
          </Dialog>
        </div>
      )
    }
  }
}
const SLIDER = gql `
    query sliders($query: String, $queryStockType: String){
      sliders(query: $query) {
        _id
        image {
          _id
          file
          fileName
          type
        }
        type {
          _id name type
        }
      }
      categories {
          _id
          name
      }
      stockTypes(query: $queryStockType) {
          _id name
      }
}`
const UPDATE_SLIDER = gql `
  mutation updateSlider($userId: String,$_id:String,$info:String){
    updateSlider(userId: $userId,_id:$_id,info:$info)
  }
`;
const INSERT_SLIDER = gql `
    mutation insertSlider($userId: String!, $info: String!){
        insertSlider(userId: $userId, info: $info)
}`
export default compose(
  graphql(SLIDER, {
    options: () => ({variables: {
        queryStockType: JSON.stringify(
        {
          isProduct: true, active : true, _id: {$ne: '0'}
        }
      ),
      query: JSON.stringify(
        {
          active: true, isFindingType: true
        }
      )
    }, fetchPolicy: 'network-only'})
  }),
  graphql(UPDATE_SLIDER, {
    props: ({mutate}) => ({
      updateSlider: (userId, _id, info) => mutate({
        variables: {
          userId,
          _id,
          info
        }
      })
    })
  }),
  graphql(INSERT_SLIDER, {
    props: ({mutate}) => ({
      insertSlider: (userId, info) => mutate({
        variables: {
          userId,
          info
        }
      })
    })
  })
  )(ManagerImage);
