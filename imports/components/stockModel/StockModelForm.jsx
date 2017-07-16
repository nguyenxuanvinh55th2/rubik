import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import __ from 'lodash';
import moment from 'moment';
import accounting from 'accounting';
import Cleave from 'cleave.js/react';
import QuillEditor from '../editor/QuillEditor.jsx';
import Dialog from 'material-ui/Dialog';
import { RenderImage } from './DialogStockModel.jsx';
import { SketchPicker } from 'react-color';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Select, {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
class StockModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state ={
      height: window.innerHeight,
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      openDialog: false,
      data: {
        name: '', weight: '', colors: [], origin: '', isLimited: false, isPromotion: false,
        images: [], unit: '', averagePrice: 0, price: 0, quantity: 0, saleOff: 0,
        stockType :{_id: '', name: ''}, categories: [],
        description: '', active: true
      },
      isCreateNew: false
    }
  }
  handleResize(e) {
      this.setState({height: window.innerHeight});
  }
  componentDidMount() {
      window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
  }
  handleDeleteImage(idx){
    let data = this.state.data;
    data.images.splice(idx,1);
    this.setState({data: data});
  }
  handleAddImage(images) {
    let data = this.state.data;
    data.images = images;
    this.setState({data:data, openDialog:false});
  }
  handleClick = () => {
     this.setState({ displayColorPicker: !this.state.displayColorPicker })
   }
   handleClose = () => {
     this.setState({ displayColorPicker: false })
   }
   handleChange = (color) => {
     this.setState({ color: color.rgb })
   }
   handleSave(type){
     let data = this.state.data;
     data.categories = __.map(data.categories, (category) => category.name)
     let info = {
       data: data,
       images: this.state.data.images
     }
     if(this.props.insertStockModel){
       this.props.insertStockModel(Meteor.userId(), JSON.stringify(info)).then(({data}) => {
         if(data.insertStockModel){
           this.props.addNotificationMute({fetchData: true, message: 'Thêm hàng mới thành công', level:'success'});
           if(type){
             this.setState({data: {
               name: '', weight: '', colors: [], origin: '', isLimited: false, isPromotion: false,
               images: [], unit: '', averagePrice: 0, price: 0, quantity: 0, saleOff: 0, stockType :{_id: '', name: ''},
               description: '', categories: []
             }})
           }
           else {
             browserHistory.push('/StockModels');
           }
         }
       })
       .catch((error) => {
         console.log(error);
         this.props.addNotificationMute({fetchData: true, message: 'Thêm hàng mới hàng thất bại', level:'error'});
       })
     }
   }
  render(){
    let { data } = this.state;
    if(!this.props.data.stockTypes){
      return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin" style={{fontSize: 50}}></i>
        </div>
      )
    }
    else {
      const styles = {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      }
      return(
        <div className="column">
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <ol className="breadcrumb" style={{marginBottom: 0}}>
              <li>
                <a onClick={() => browserHistory.push('/dashboard')}>Dashboard</a>
              </li>
              <li>
                <a onClick={() => browserHistory.push('/stockModels')}>Kiểu hàng</a>
              </li>
            </ol>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>
              <button type="button" className="btn btn-primary" disabled={!data.name || !data.unit} onClick={() => this.handleSave(true)}>Lưu và khởi tạo</button>
              <button type="button" className="btn btn-primary" disabled={!data.name || !data.unit} style={{marginLeft: 10}} onClick={() => {
                this.handleSave()
              }}>Lưu</button>
              <button type="button" className="btn btn-danger" style={{margin: '0 10px'}}>Hủy</button>
            </div>
          </div>
          <div className="row" style={{padding: 10, backgroundColor:"rgb(204, 204, 204)", marginTop: 5}}>
            <div className="col-sm-6 col-md-4 col-lg-3" style={{paddingRight: 0}}>
              <div className="column" style={{backgroundColor: 'white', height: this.state.height - 152, overflow: 'auto'}}>
                <form className="form-horizontal" style={{padding: '2px 25px 2px 25px'}}>
                  <div className="form-group">
                    <label>Tên</label>
                    <input type="text" className="form-control" value={data.name} onChange={({target}) => {
                      this.setState((prevState) => {
                        prevState.data.name = target.value;
                        return prevState;
                      });
                    }}/>
                  </div>
                  <div className="form-group">
                    <label>Cân nặng</label>
                    <input type="text" className="form-control" value={data.weight} onChange={({target}) => {
                      this.setState((prevState) => {
                        prevState.data.weight = target.value;
                        return prevState;
                      });
                    }}/>
                  </div>
                  <div className="form-group">
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <label>Màu sắc</label>
                      <div style={ styles.swatch } onClick={ this.handleClick }>
                         <div style={ styles.color } />
                     </div>
                    </div>
                     { this.state.displayColorPicker ? <div style={ styles.popover }>
                       <div style={ styles.cover } onClick={ this.handleClose }/>
                       <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                     </div> : null }
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Xuất xứ</label>
                    <input type="text" className="form-control" value={data.origin} onChange={({target}) => {
                      this.setState((prevState) => {
                        prevState.data.origin = target.value;
                        return prevState;
                      });
                    }}/>
                  </div>
                  <div className="form-group" style={{display: 'flex',flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <div className="checkbox" style={{width: '50%'}}>
                      <label><input type="checkbox" checked={data.isLimited} onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.data.isLimited = !prevState.data.isLimited;
                          return prevState;
                        });
                      }} />Hàng giới hạn</label>
                    </div>
                    <div className="checkbox" style={{width: '50%'}}>
                      <label><input type="checkbox" checked={data.isPromotion} onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.data.isPromotion = !prevState.data.isPromotion;
                          return prevState;
                        });
                      }}/>Hàng giảm giá</label>
                    </div>
                  </div>
                  <div style={{textAlign: 'center',width:'40%'}}>
                    <img style={{maxWidth: '90%', height: 'auto'}} onClick={() => this.setState({openDialog:true})}
                        src={ data.images[0] ? data.images[0].file  : "https://challengeinequality.luskin.ucla.edu/wp-content/uploads/sites/4/2015/12/Photo-Not-Available.jpg" } alt="" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3" style={{paddingRight: 0}}>
              <div className="column" style={{backgroundColor: 'white', height: this.state.height - 152, overflow: 'auto'}}>
                <form className="form-horizontal" style={{padding: '2px 25px 2px 25px'}}>
                  <div className="form-group">
                    <label>Đơn vị</label>
                    <input type="text" className="form-control" value={data.unit} onChange={({target}) => {
                      this.setState((prevState) => {
                        prevState.data.unit = target.value;
                        return prevState;
                      });
                    }}/>
                  </div>
                  <div className="form-group">
                    <label>Loại hàng</label>
                    <Select
                      name="form-field-name"
                      value={data.stockType._id ? data.stockType._id : ''}
                      valueKey="_id"
                      labelKey="name"
                      options={this.props.data.stockTypes}
                      placeholder="Chọn loại hàng"
                      onChange={(value) => {
                        this.setState((prevState) => {
                          prevState.data.stockType = value;
                          return prevState;
                        })
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Chủng loại</label>
                    <Creatable
                      multi={true}
                      value={data.categories}
                      valueKey="_id"
                      labelKey="name"
                      placeholder="Chọn chủng loại"
                      options={this.props.data.categories}
                      promptTextCreator={(label) => {
                        return (label: String)
                      }}
                      onChange={(value) => {
                        this.setState((prevState) => {
                          if(this.state.isCreateNew){
                            if(this.props.insertCategories){
                              this.props.insertCategories(Meteor.userId(), JSON.stringify({
                                name: value[value.length -1].name,
                                active: true,
                                isCategory: true
                              })).then(({data}) => {
                                this.props.data.refetch();
                                prevState.isCreateNew = false;
                                if(data.insertCategories){
                                  value[value.length -1]._id = data.insertCategories;
                                }
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                            }
                          }
                          prevState.data.categories = value;
                          return prevState;
                        })
                      }}
                      shouldKeyDownEventCreateNewOption={(event, label, value) => {
                        if(event.keyCode == 13){
                          this.setState({isCreateNew: true})
                        }
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá nhập</label>
                    <Cleave className="form-control" style={{textAlign: 'right'}}
                       value={data.averagePrice}  options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                       onFocus={({target}) => { if(target.value === '0') { target.value = '' } }}
                       onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.data.averagePrice = target.value;
                          return prevState;
                        });
                    }}/>
                  </div>
                  <div className="form-group">
                    <label>Giá bán</label>
                    <Cleave className="form-control" style={{textAlign: 'right'}}
                       value={data.price}  options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                       onFocus={({target}) => { if(target.value === '0') { target.value = '' } }}
                       onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.data.price = target.value;
                          return prevState;
                        });
                    }}/>
                  </div>
                  <div className="form-group">
                    <label>Số lượng</label>
                    <input type="number" className="form-control" style={{textAlign: 'right'}} value={data.quantity}  onFocus={({target}) => { if(target.value === '0') { target.value = '' } }}
                      onChange={({target}) => {
                      this.setState((prevState) => {
                        prevState.data.quantity = target.value;
                        return prevState;
                      });
                    }}/>
                  </div>
                  <div className="form-group">
                    <label>Giá giảm</label>
                    <Cleave className="form-control" style={{textAlign: 'right'}}
                       value={data.saleOff}  options={{numeral: true, numeralThousandsGroupStyle: 'thousand'}}
                       onFocus={({target}) => { if(target.value === '0') { target.value = '' } }}
                       disabled={!data.isPromotion}
                       onChange={({target}) => {
                        this.setState((prevState) => {
                          prevState.data.saleOff = target.value;
                          return prevState;
                        });
                    }}/>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-6">
              <div className="column" style={{backgroundColor: 'white', height: this.state.height - 152, overflow: 'auto'}}>
                <form style={{padding: '2px 25px 2px 25px'}}>
                  <div className="form-group">
                    <label>Mô tả</label>
                    <QuillEditor height={window.innerHeight - 280} value={data.description} getValue={(value) => {
                      this.setState((prevState) => {
                        prevState.data.description = value;
                        return prevState;
                      });
                    }}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Dialog modal={true}
              open={this.state.openDialog}
              contentStyle={{width: 835,height:'90%',maxWidth: 'none',}}
              bodyStyle={{padding: 0}}
          >
              <RenderImage {...this.props} height={window.innerHeight - 226} handleClose={this.handleAddImage.bind(this)}
                  dataImages={data.images} handleDeleteImage={this.handleDeleteImage.bind(this)}/>
          </Dialog>
        </div>
      )
    }
  }
}

const STOCK_TYPE = gql`
    query stockTypes{
        stockTypes {
            _id name
        }
        categories {
          _id name
        }
}`

const INSERT_STOCKMODEL = gql`
    mutation insertStockModel($userId: String!, $info: String!){
        insertStockModel(userId: $userId, info: $info)
}`
const INSERT_STOCK_CATEGORY = gql`
    mutation insertCategories($userId: String!, $info: String!){
        insertCategories(userId: $userId, info: $info)
}`
export default compose (
    graphql(STOCK_TYPE, {
        options: ()=> ({
            variables: {},
            fetchPolicy: 'network-only'
        })
    }),
    graphql(INSERT_STOCKMODEL, {
        props: ({mutate})=> ({
            insertStockModel : (userId, info) => mutate({variables:{userId, info}})
        })
    }),
    graphql(INSERT_STOCK_CATEGORY, {
        props: ({mutate})=> ({
            insertCategories : (userId, info) => mutate({variables:{userId, info}})
        })
    }),
)(StockModelForm);
