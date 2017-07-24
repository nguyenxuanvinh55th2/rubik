import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
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
