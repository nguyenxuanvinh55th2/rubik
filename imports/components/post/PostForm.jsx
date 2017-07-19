import React from 'react';
import { Meteor } from 'meteor/meteor';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import accounting from 'accounting';
import QuillEditor from '../editor/QuillEditor.jsx';
import Select, {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import __ from 'lodash';
class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '', content: '', image: {}, description: '', height: window.innerHeight,
      stockType: {
        _id: '', name : ''
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.params._id && nextProps.data.post){
      let post = __.cloneDeep(nextProps.data.post);
      this.setState({
        title: post.title, content: post.content, image: post.image, description: post.description,
        stockType: post.stockType
      })
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
  handleSave(type){
    let info = {
      data: {
        title: this.state.title, content: this.state.content, description: this.state.description,
        stockType: this.state.stockType, active: true
      },
      image: this.state.image
    }
    if(this.props.params._id){
      if(this.props.updatePost){
        this.props.updatePost(Meteor.userId(),this.props.params._id, JSON.stringify(info)).then(({data}) => {
          this.props.addNotificationMute({fetchData: true, message: 'Cập nhật thành công', level: 'success'});
          browserHistory.push('/post');
        })
        .catch((error) => {
          console.log(error);
          this.props.addNotificationMute({fetchData: true, message: 'Cập nhật thất bại', level: 'error'});
        })
      }
    }
    else {
      if(this.props.insertPost){
        this.props.insertPost(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
          if(data.insertPost){
            if(type){
              this.setState({
                title: '', content: '', image: {}, description: '', stockType: {
                  _id: '', name : ''
                }
              })
              if(document.getElementById('editor') && document.getElementById('editor').firstChild){
                document.getElementById('editor').firstChild.innerHTML =''
              }
              this.props.addNotificationMute({fetchData: true, message: 'Thêm bài dăng thành công', level: 'success'});
            }
            else {
              browserHistory.push('/post');
            }
          }
        })
        .catch((error) =>  {
          console.log(error);
          this.props.addNotificationMute({fetchData: true, message: 'Thêm bài dăng thất bại', level: 'error'});
        })
      }
    }
  }
  render(){
    if(!this.props.data.stockTypes){
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
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <ol className="breadcrumb" style={{
              marginBottom: 0,
              backgroundColor: 'white'
            }}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/post')}>Đăng bài</a>
              </li>
            </ol>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 5
            }}>
            {
              !this.props.params._id &&
              <button type="button" className="btn btn-primary" disabled={!this.state.title || !this.state.stockType._id || !this.state.content} onClick={() => this.handleSave(true)}>Lưu và khởi tạo</button>
            }
              <button type="button" className="btn btn-primary" disabled={!this.state.title || !this.state.stockType._id || !this.state.content} style={{
                marginLeft: 10
              }} onClick={() => {
                this.handleSave()
              }}>Lưu</button>
              <button type="button" className="btn btn-danger" style={{
                margin: '0 10px'
              }} onClick={() => browserHistory.push('/post')}>Hủy</button>
            </div>
          </div>
          <div className="row" style={{
            padding: 10,
            backgroundColor: "rgb(204, 204, 204)",
            marginTop: 5
          }}>
          <div className="col-sm-12 col-md-4 col-lg-3" style={{
            paddingRight: 0
          }}>
            <div className="column" style={{
              backgroundColor: 'white',
              height: this.state.height - 152,
              overflow: 'auto'
            }}>
            <form className="form-horizontal" style={{
              padding: '2px 25px 2px 25px'
            }}>
              <div className="form-group">
                <label>Tiêu đề</label>
                <input type="text" className="form-control" value={this.state.title} onChange={({target}) => {
                  this.setState((prevState) => {
                    prevState.title = target.value;
                    return prevState;
                  });
                }}/>
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <textarea rows="2" type="text" className="form-control" value={this.state.description} onChange={({target}) => {
                  this.setState((prevState) => {
                    prevState.description = target.value;
                    return prevState;
                  });
                }}/>
              </div>
              <div className="form-group">
                <label>Loại bài đăng</label>
                <Select name="form-field-name" value={this.state.stockType._id
                  ? this.state.stockType._id
                  : ''} valueKey="_id" labelKey="name" options={this.props.data.stockTypes} placeholder="Chọn loại bài đăng" onChange={(value) => {
                  this.setState((prevState) => {
                    prevState.stockType = value;
                    return prevState;
                  })
                }}/>
              </div>
              <div className="form-group">
                <label>Ảnh tiêu đề</label>
                <input type="file" id="getDataImageProfile" accept="image/*" multiple={false} onChange={({target}) => this.handleAddImage(target.files)} />
              </div>
              {
                this.state.image && this.state.image.file &&
                <img src={this.state.image.file} />
              }
            </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 col-lg-9">
            <div className="column" style={{
              backgroundColor: 'white',
              height: this.state.height - 152,
              overflow: 'auto'
            }}>
              <form style={{
                padding: '2px 25px 2px 25px'
              }}>
                <div className="form-group">
                  <label>Nội dung</label>
                  <QuillEditor height={window.innerHeight - 280} value={this.state.content} getValue={(value) => {
                    this.setState((prevState) => {
                      prevState.content = value;
                      return prevState;
                    });
                  }}/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

const INSERT_POST = gql `
    mutation insertPost($userId: String!, $info: String!){
        insertPost(userId: $userId, info: $info)
}`
const UPDATE_POST = gql`
  mutation updatePost($userId: String,$_id:String,$info:String){
    updatePost(userId: $userId,_id:$_id,info:$info)
  }
`;
const STOCK_TYPE = gql `
    query stockTypes($_id: String, $query: String){
        post(_id: $_id) {
        _id title  content  description
        image {
          _id  file fileName
        }
        stockType { _id name }
      }
      stockTypes(query: $query) {
          _id name
      }
}`
export default compose(graphql(STOCK_TYPE, {
  options: (ownProps) => ({
    variables: {
      _id: ownProps.params._id ? ownProps.params._id : '', query: JSON.stringify(
        {
          isNavigation: true, active : true, _id: {$ne: '0'}
        }
      )
    },
    fetchPolicy: 'network-only'
  })
}), graphql(INSERT_POST, {
  props: ({mutate}) => ({
    insertPost: (userId, info) => mutate({
      variables: {
        userId,
        info
      }
    })
  })
}),
graphql(UPDATE_POST,{
    props:({mutate})=>({
    updatePost : (userId,_id,info) =>mutate({variables:{userId,_id,info}})
  })
}),
)(PostForm);
