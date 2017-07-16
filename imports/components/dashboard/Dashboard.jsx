import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {}
    }
  }
  onDropAccepted(files) {
    let that = this;
    if(files.length){
      let file = files[0];
      if(file.size <= 1024*1000*2){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            if(e.target.result){
              that.setState({file: {
                file: e.target.result,
                fileName: file.name,
                type: file.type
              }})
            }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
      else {
        alert('File nhỏ hơn 10MB!');
      }
    }
  }
  inserFile(){
    let info = {
      files: [this.state.file]
    }
    if(this.props.insertFiles){
      this.props.insertFiles(Meteor.userId(), JSON.stringify(info)).then((data) => {
        console.log(data);
      })
    }
  }
  render(){
    return (
      <div>
        {/* <Dropzone onDrop={this.onDropAccepted.bind(this)} multiple={true} style={{height: 140, border: '1px solid gray', borderRadius: 10, padding: '13px 7px', width: 350}} minSize={0} maxSize={1024*10*1000}>
          <div style={{textAlign: 'center'}}>Click or Drap here to upload file</div>
        </Dropzone>
        <button onClick={() => this.inserFile()}>ok</button> */}
      </div>
    )
  }
}
const INSERT_MEMBER_REPLY = gql`
 mutation insertFiles($userId: String,$info:String){
   insertFiles(userId: $userId,info:$info)
 }
`;
export default compose(
graphql(INSERT_MEMBER_REPLY,{
     props:({mutate})=>({
     insertFiles : (userId,info) =>mutate({variables:{userId, info}})
   })
 })
)(Dashboard);
