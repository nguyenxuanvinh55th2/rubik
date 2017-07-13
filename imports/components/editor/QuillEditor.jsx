import React from 'react';
import { findDOMNode } from 'react-dom';

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

let quillEditor = null;
export default class QuillEditor extends React.Component {
  constructor(props){
      super(props);
      this.quillEditor = null;
  }
  getHtmlText() {
    let content = document.getElementById('editor').firstChild.innerHTML;
    this.props.getValue(content)
  }
  componentDidMount() {
      let that = this;
      let element = findDOMNode(this.refs.editor);
      var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];
      this.quillEditor = new Quill(element, {
          theme: 'snow',
          modules: {
              toolbar: toolbarOptions
          }
      });
      document.getElementById('editor').firstChild.innerHTML = this.props.value;
      this.quillEditor.on('text-change', (delta) => {
        if(this.props.getValue){
          this.props.getValue(document.getElementById('editor').firstChild.innerHTML)
        }
      });
  }
  render() {
    let { height, value} = this.props;
    return (
      <div id="editor" style={{height: this.props.height}} ref="editor"></div>
    )
  }
}
