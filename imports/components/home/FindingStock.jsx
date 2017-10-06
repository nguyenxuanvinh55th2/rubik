import React from 'react';
import {Meteor} from 'meteor/meteor';
import __ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
class FindingStock extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    if(!this.props.data.sliders){
      return (
        <div className="row text-center">
          <div className="col-sm-4">
            <div className="item-center bg" style={{
              backgroundImage: "url('/imgs/tutorial.jpg')"
            }}>
              <p>
                <Link to={'/huong-dan-choi/2'} className="btn btn-cate">Hướng dẫn chơi</Link>
              </p>
            </div>
          </div>
        </div>
      )
    }
    else {
      let data = __.chunk(this.props.data.sliders, 2)
      return (
        <div className="row">
          <div className="col-sm-4">
            {
              __.map(data[0] ? data[0] : [], (slide, idx) => {
                return(
                  <div key={idx} className="item bg" style={{
                    backgroundImage: `url(${slide.image.file})`
                  }}>
                    <p>
                      <Link to={`/san-pham/${slide.type.type == 'category' ? 'chung-loai' : 'loai-hang'}/${slide.type._id}`} className="btn btn-cate">{slide.type.name}</Link>
                    </p>
                  </div>
                )
              })
            }
          </div>
          <div className="col-sm-4">
            <div className="item-center bg" style={{
              backgroundImage: "url('/imgs/tutorial.jpg')"
            }}>
              <p>
                <Link to={'/huong-dan-choi/2'} className="btn btn-cate">Hướng dẫn chơi</Link>
              </p>
            </div>
          </div>
          <div className="col-sm-4">
            {
              __.map(data[1] ? data[1] : [], (slide, idx) => {
                return(
                  <div key={idx} className="item bg" style={{
                    backgroundImage: `url(${slide.image.file})`
                  }}>
                    <p>
                      <Link to={`/san-pham/${slide.type.type == 'category' ? 'chung-loai' : 'loai-hang'}/${slide.type.type == 'category' ? slide.type.name : slide.type._id}`} className="btn btn-cate">{slide.type.name}</Link>
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
  }
}
const SLIDER = gql `
    query sliders($query: String){
      sliders(query: $query) {
        _id
        image {
          _id
          file
          fileName
          type
        }
        type {
          _id name type
        }
      }
}`
export default compose(
  graphql(SLIDER, {
    options: () => ({variables: {
      query: JSON.stringify(
        {
          active: true, isFindingType: true
        }
      )
    }, fetchPolicy: 'network-only'})
  })
  )(FindingStock);
