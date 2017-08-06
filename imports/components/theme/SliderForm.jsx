import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
import Dialog from 'material-ui/Dialog';
class SliderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: window.innerHeight,
      open: false,
      link: '', image: {}
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
  handleSaveColor(){
    if(this.state.image){
      let info = {
        data: {
          link: this.state.link,
          active: true,
          isSlider: true
        },
        image: this.state.image
      }
      if(this.props.insertSlider){
        this.props.insertSlider(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
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
  renderDialog(){
    return (
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
              <h4 className="modal-title">Tạo mới slider </h4>
            </div>
            <div className="modal-body" style={{height: window.innerHeight - 250 , overflowY: 'auto',  overflowX: 'hidden'}}>
              <form className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-sm-3">Đường dẫn</label>
                  <div className="col-sm-9">
                    <div className="checkbox">
                      <input type="text" className="form-control" value={this.state.link} onChange={({target}) => this.setState({link: target.value})}/>
                   </div>
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
              <button type="button" className="btn btn-default" onClick={() => this.setState({open: false})}>Đóng</button>
              <button type="button" className="btn btn-primary" disabled={!this.state.image.file} onClick={() => this.handleSaveColor()}>Lưu</button>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
  render(){
    if(!this.props.data.sliders){
      if(this.props.data.loading){
        return(
          <div className="item-slider">
            <div className="loading">
                <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
            </div>
          </div>
        )
      }
      else {
        return (
          <div>
            <button type="button" className="btn btn-primary" style={{marginTop: 10, marginRight: 10}} onClick={() => this.setState({open: true})}>
              Thêm mới
            </button>
            {
              this.renderDialog()
            }
          </div>
        )
      }
    }
    else {
      return(
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
                <a onClick={() => browserHistory.push('/slider')}>Slider</a>
              </li>
            </ol>
            <button type="button" className="btn btn-primary" style={{marginTop: 10, marginRight: 10}} onClick={() => this.setState({open: true})}>
              Thêm mới
            </button>
          </div>
          <div className="row">
            {
                __.map(this.props.data.sliders, (slide, idx) => {
                  return (
                    <div key={idx} className="col-sm-3" style={{padding: 5}}>
                      <div className="panel panel-default" style={{height: window.innerHeight - 170}}>
                        <div className="panel-body">
                          <img className="img-responsive" src={slide.image && slide.image.file ? slide.image.file : ''} style={{width: '100%', height: window.innerHeight - 270}}/>
                          <p style={{textAlign: 'center'}}>{slide.link}</p>
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
                            {/* <button type="button" className="btn btn-primary">Sửa</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
            }
          </div>
          {
            this.renderDialog()
          }
        </div>
      )
    }
  }
}
const SLIDER = gql `
    query sliders($query: String){
      sliders(query: $query) {
        _id
        name
        image {
          _id
          file
          fileName
          type
        }
        link
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
      query: JSON.stringify(
        {
          active: true, isSlider: true
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
)(SliderForm);
