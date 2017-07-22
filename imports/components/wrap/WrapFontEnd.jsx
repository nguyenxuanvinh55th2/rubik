import React from 'react';
import __ from 'lodash';
import Header from '../main/Header.jsx'
import Footer from '../main/Footer.jsx'
import {Link} from 'react-router';
export default class WrapFontEnd extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    let childProps = __.cloneDeep(this.props);
    delete childProps.children;
    return (
      <div>
        <Header {...this.props}/>
          {React.cloneElement(this.props.children, childProps)}
          <Footer {...this.props}/>
          <div className="pin-top">
            <Link>
              <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
            </Link>
          </div>
      </div>
    )
  }
}
