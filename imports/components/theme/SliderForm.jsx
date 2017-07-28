import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';
class SliderForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    if(!this.props.data.slider){
      return(
        <div className="item-slider">
          <div className="loading">
              <i className="fa fa-spinner fa-spin" style={{fontSize: 20}}></i>
          </div>
        </div>
      )
    }
    else {
      console.log(this.props.data.slider);
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
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Hình ảnh</th>
                <th>Đường dẫn</th>
              </tr>
            </thead>
            <tbody>
              {
                __.map(this.props.data.slider.sliders, (slider, idx) => {
                  return (
                    <tr key={idx}>
                      <td><button>Xóa</button></td>
                      <td><button>Cập nhập</button></td>
                      <td>
                        <img src={slider.image.file ? slider.image.file : '/imgs/logo.png'} style={{height: 60, width: 100}} />
                      </td>
                      <td>
                        <a href={slider.link}></a>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
}
const SLIDER = gql `
    query slider{
      slider {
        _id
        name
        sliders {
          image {
            _id
            file
            fileName
            type
          }
          link
        }
      }
}`

const UPDATE_SLIDER = gql `
  mutation updateSlider($userId: String,$_id:String,$info:String){
    updateSlider(userId: $userId,_id:$_id,info:$info)
  }
`;

export default compose(
  graphql(SLIDER, {
    options: () => ({variables: {}, fetchPolicy: 'network-only'})
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
)(SliderForm);
