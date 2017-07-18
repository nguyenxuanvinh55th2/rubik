import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import accounting from 'accounting';
import { HanderEditorPost, RenderImage, RenderDescription, UpdateQuantity } from './ChildPost.jsx';
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      open: false,
      name: '',
      dialogType: '',
      postSelected: {}
    }
    this.gridOptions = {
    floatingFilter: true,
    onFilterChanged: () => {
        let data = [], models = this.gridOptions.api.getModel().rowsToDisplay;
        __.forEach(models, (model) => {
            data.push(model.data);
        });
        this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(data));
        this.saveFilter = this.gridOptions.api.getFilterModel();
      }
    };
  }
  renderFooterData(data) {
  return [
    {
      gridType: 'footer',
      title: 'Total: ' +  data.length,
    }];
  }
  componentDidUpdate() {
    if (this.gridOptions.api) {
      this.gridOptions.api.showLoadingOverlay();
      this.gridOptions.api.setRowData(this.props.data.posts);
      this.gridOptions.api.setFloatingBottomRowData(this.renderFooterData(this.props.data.posts));
      this.gridOptions.api.hideOverlay();
    }
  }
  deletePost(node){
    var deleteImage = confirm("Bạn có muốn bài đăng này?");
    if (deleteImage == true) {
      Posts.update({_id: node.data._id},{$set: {active: false}},(error) => {
        if(error){
          throw error;
           this.props.addNotificationMute({fetchData: true, message: 'Xóa bài đăng thất bại', level:'error'});
        }
        else {
          this.props.addNotificationMute({fetchData: true, message: 'Xóa bài đăng thành công', level:'success'});
          this.props.data.refetch();
        }
      });
    }
  }
  updatePost(node){
    browserHistory.push(`/postForm/${node.data._id}`);
  }
  showImage(node){
    this.setState({open: true, dialogType: 'image', postSelected: node.data});
  }
  showDescription(node){
    this.setState({open: true, dialogType: 'description', postSelected: node.data})
  }
  render(){
    if(!this.props.data.posts){
      return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
        </div>
      )
    }
    else {
      let columnDefs = [
        {
          headerName: "", field: 'delete',  minWidth: 80, width: 80,  pinned: 'left', filter: '',
          cellRendererFramework: HanderEditorPost ,
          cellRendererParams: {
              updatePost: this.updatePost.bind(this), showImage: this.showImage.bind(this), showDescription: this.showDescription.bind(this), deletePost: this.deletePost.bind(this)
            },
          cellStyle: (params) => {
            if (params.node.data.gridType == 'footer') {
              return {display: 'none'};
            }
          }
        },
        {
          headerName: "Tiêu đề",  field: "title", pinned: 'left',  width: 250, filter: 'text', filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },   suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Loại bài đăng", field: "stockType.name",  width: 120, filter: 'text', suppressMenu: true,
          filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
        {
          headerName: "Mô tả",  field: "description", width: 300, filter: 'text', filterParams: {
            filterOptions: ['contains', 'notContains', 'startsWith', 'endsWith']
          },   suppressMenu: true,
          cellStyle: function(params) {
            if (params.node.data.gridType == 'footer') {
              return {fontWeight: 'bold'};
            } else {
              return null;
            }
          }
        },
      ]
      return(
        <div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <ol className="breadcrumb" style={{marginBottom: 0, backgroundColor: 'white'}}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/post')}>Bài đăng</a>
              </li>
            </ol>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 10, paddingBottom: 10}}>
              <button type="button" className="btn btn-primary" onClick={() => browserHistory.push('/postForm')}>Tạo mới</button>
            </div>
          </div>
          <div style={{  height: this.state.height - 136}} className="ag-fresh">
            <AgGridReact gridOptions={this.gridOptions} columnDefs={columnDefs} rowData={this.data} enableColResize="true" enableSorting="true" enableFilter="true"/>
          </div>
          <Dialog modal={true}
              open={this.state.open}
              contentStyle={{width: this.state.dialogType == 'image' ? 500 : 835, maxWidth: 'none',}}
              bodyStyle={{padding: 0}}
          >
            {
              this.state.dialogType == 'image' ?
              <RenderImage {...this.props} height={window.innerHeight - 250} handleClose={() => this.setState({open: false})}
                  image={this.state.postSelected.image}/> :
              this.state.dialogType == 'description' ?
              <RenderDescription {...this.props} height={window.innerHeight -250} handleClose={() => this.setState({open: false})}
                description={this.state.postSelected.description}/>
              : null
            }
          </Dialog>
        </div>
      )
    }
  }
}
const POST_QUERY = gql `
    query posts{
      posts {
      _id title  content  description
      image {
        _id  file fileName
      }
      stockType { _id name }
    }
}`

export default compose(graphql(POST_QUERY, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
}),)(Post);
