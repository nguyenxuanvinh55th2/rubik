import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import accounting from 'accounting';
import QuillEditor from '../editor/QuillEditor.jsx';
import Select, {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import Dropzone from 'react-dropzone';
export default class PostForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '', content: '', images: [], description: '', height: window.innerHeight,
      stockType: {
        _id: '', name : ''
      }
    }
  }
  render(){
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
            <button type="button" className="btn btn-primary" style={{
              margin: '0 10px'
            }} onClick={() => {}}>Lưu</button>
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
                : ''} valueKey="_id" labelKey="name" options={[]} placeholder="Chọn loại bài đăng" onChange={(value) => {
                this.setState((prevState) => {
                  return prevState;
                })
              }}/>
            </div>
            <div className="form-group">
              <label>Ảnh tiêu đề</label>
              <input type="file" />
            </div>
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
