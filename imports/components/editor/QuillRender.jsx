import React from 'react';
export default class QuillRender extends React.Component {
  constructor(props) {
    super()
  }
  componentDidUpdate() {
    let description = document.getElementById('description');
    if(description) {
      description.innerHTML = this.props.value;
    }
  }
  render(){
    return (
      <div id="description"></div>
    )
  }
}
