import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import QuillEditor from '../editor/QuillEditor.jsx';
class EditAbout extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '', content: '', image: {}, description: '', height: window.innerHeight, _id: '',
      stockType: {
        _id: '', name : ''
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data.getAllPostByType){
      if(nextProps.data.getAllPostByType[0]){
        let data = nextProps.data.getAllPostByType[0];
        this.setState({
          _id: data._id,
          title: data.title, content: data.content,
          image: data.image, description: data.description, stockType: data.stockType
        })
      }
    }
  }
  handleSave(){

  }
  render(){
    if(!this.props.data.getAllPostByType){
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
              <button type="button" className="btn btn-primary" disabled={!this.state.content} style={{
                marginLeft: 10
              }} onClick={() => {
                this.handleSave()
              }}>Lưu</button>
              <button type="button" className="btn btn-danger" style={{
                margin: '0 10px'
              }} onClick={() => browserHistory.push('/dashboard')}>Hủy</button>
            </div>
          </div>
          <div className="row" style={{
            padding: 10,
            backgroundColor: "rgb(204, 204, 204)",
            marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
          }}>
            <div className="col-sm-12 col-md-10 col-lg-8" style={{
              backgroundColor: 'white',
              height: this.state.height - 152,
              overflow: 'auto'
            }}>
              <QuillEditor height={window.innerHeight - 220} value={this.state.content} getValue={(value) => {
                this.setState((prevState) => {
                  prevState.content = value;
                  return prevState;
                });
              }}/>
            </div>
          </div>
        </div>
      )
    }
  }
}
const POST = gql `
    query post($stockTypeId: String){
        getAllPostByType(stockTypeId: $stockTypeId) {
        _id title  content  description
        image {
          _id  file fileName
        }
        stockType { _id name }
      }
}`
export default compose(graphql(POST, {
  options: (ownProps) => ({
    variables: {
      stockTypeId: '0'
    },
    fetchPolicy: 'network-only'
  })
}),
)(EditAbout);
