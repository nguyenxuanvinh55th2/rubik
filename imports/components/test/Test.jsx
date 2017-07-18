import React from 'react';
import __ from 'lodash';
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
import {Link} from 'react-router';
export default class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let childProps = __.cloneDeep(this.props);
    delete childProps.children;
    return (
      <div>
        <Header/>
          {React.cloneElement(this.props.children, childProps)}
          <Footer/>
          <div className="pin-top">
            <Link to={'#'}>
              <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
            </Link>
          </div>
      </div>
    )
  }
}
