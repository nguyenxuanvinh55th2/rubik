import React from 'react';
import ReactDOM from 'react-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import __ from 'lodash';

import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';


class Rating extends React.Component {
  constructor(props) {
    super(props);
    if(!props.allowEdit) {
      if(props.rateCount) {
        let starList = {};
        for(let i = 1; i <= 5; i++) {
          if(i <= props.rateCount) {
            starList[i.toString()] = true;
          } else {
              starList[i.toString()] = false;
          }
        }
        this.state = {starList};
      }
      let starList = {};
      let starText = '';
      let stars = 0;
      if(props.rating && props.rating.length) {
        __.forEach(props.rating, item => {
          stars += item.stars;
        })
        stars = props.rateCount ? props.rateCount : Math.round(stars / props.rating.length);
        for(let i = 1; i <= 5; i++) {
          if(i <= stars) {
            starList[i.toString()] = true;
          } else {
              starList[i.toString()] = false;
          }
        }
        let starText;
        switch (stars) {
          case 1:
            starText = 'Một sao';
            break;
          case 2:
            starText = 'Hai sao';
            break;
          case 3:
            starText = 'Ba sao';
            break;
          case 4:
            starText = 'Bốn sao';
            break;
          case 5:
            starText = 'Năm sao';
            break;
        }
      }
      this.state = {starList, starText, rate: 0};
    } else {
        this.state = {starList: [], starText: ''};
    }
  }

  componentWillReceiveProps(nextProps) {
    let { rateCount, rating } = nextProps;
    if(!this.props.allowEdit) {
      if(rateCount) {
        let starList = {};
        for(let i = 1; i <= 5; i++) {
          if(i <= rateCount) {
            starList[i.toString()] = true;
          } else {
              starList[i.toString()] = false;
          }
        }
        this.setState({starList});
      }
      let starList = {};
      let starText = '';
      let stars = 0;
      if(rating && rating.length) {
        __.forEach(rating, item => {
          stars += item.stars;
        })
        stars = this.props.rateCount ? this.props.rateCount : Math.round(stars / rating.length);
        for(let i = 1; i <= 5; i++) {
          if(i <= stars) {
            starList[i.toString()] = true;
          } else {
              starList[i.toString()] = false;
          }
        }
        let starText;
        switch (stars) {
          case 1:
            starText = 'Một sao';
            break;
          case 2:
            starText = 'Hai sao';
            break;
          case 3:
            starText = 'Ba sao';
            break;
          case 4:
            starText = 'Bốn sao';
            break;
          case 5:
            starText = 'Năm sao';
            break;
        }
      }
      this.setState({starList, starText, rate: stars});
    }
  }

  onMouseOver(index) {
    let { allowEdit } = this.props;
    if(allowEdit) {
      index = parseInt(index);
      this.setStarText(index);
      for(let i = 1; i <= index; i++) {
        ReactDOM.findDOMNode(this.refs[i.toString()]).style.color = '#FCB826';
      }
      if(this.state.starList[(index + 1).toString()]) {
        for(let i = index + 1; i <= 5; i++) {
          let starList = this.state.starList;
          starList[i.toString()] = false;
          this.setState({starList});
        }
      }
    }
  }

  getStarPercent(stars) {
    let { rating } = this.props;
    if(rating) {
      let count = this.getStarCount(stars);
      return Math.round((count / rating.length) * 100);
    } else {
        return 0;
    }
  }

  getStarCount(stars) {
    let { rating } = this.props;
    let count = 0;
    if(rating) {
      __.forEach(rating, item => {
        if(item.stars === stars) {
          count ++;
        }
      });
    }
    return count;
  }

  onMouseOut(index) {
    let { allowEdit } = this.props;
    if(allowEdit) {
      index = parseInt(index);
      for(let i = 5; i >= index; i--) {
        ReactDOM.findDOMNode(this.refs[i.toString()]).style.color = '#D7D7D7';
      }
    }
  }

  onMouseLeave() {
    let { allowEdit } = this.props;
    let { starList } = this.state;
    if(allowEdit) {
      for(let i = 1; i <= 5; i++) {
        ReactDOM.findDOMNode(this.refs[i.toString()]).style.color = '#D7D7D7';
      }
      let count = 0;
      for(let i = 1; i <= 5; i++) {
        if(starList[i]) {
          count ++;
        }
      }
      this.setStarText(count);
    }
  }

  rating(index) {
    let { allowEdit, stockModelId } = this.props;
    if(allowEdit) {
      for(let i = 1; i <= index; i++) {
        let starList = this.state.starList;
        starList[i.toString()] = true;
        this.setState({starList});
      }
      for(let i = index + 1; i <= 5; i++) {
        let starList = this.state.starList;
        starList[i.toString()] = false;
        this.setState({starList});
      }
      //ReactDOM.findDOMNode(this.refs[(index + 1).toString()]).style.color = '#D7D7D7';
      this.props.ratingHandle(index);
    }
  }

  setStarText(index) {
    switch (index) {
      case 1:
        this.setState({starText: 'Một sao'});
        break;
      case 2:
        this.setState({starText: 'Hai sao'});
        break;
      case 3:
        this.setState({starText: 'Ba sao'});
        break;
      case 4:
        this.setState({starText: 'Bốn sao'});
        break;
      case 5:
        this.setState({starText: 'Năm sao'});
        break;
      default:

    }
  }

  render() {
    let stars = [1, 2, 3, 4, 5];
    let deStars = [5, 4, 3, 2, 1];
    let { starList, starText, rate } = this.state;
    let { iconSize, showStarText, showStatis, ratingHandle, rating, t, factor } = this.props;
    return (
      <div onMouseLeave={this.onMouseLeave.bind(this)} style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 0}}>
        <div>
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          {
            stars.map((item, idx) => (
              <Checkbox
                key={idx}
                onMouseOver={this.onMouseOver.bind(this, item)}
                onMouseOut={this.onMouseOut.bind(this, item)}
                checked={starList[item.toString()]}
                onCheck={this.rating.bind(this, item)}
                checkedIcon={<FontIcon className="material-icons" style={{fontSize: iconSize, color: '#FCB826'}}>star</FontIcon>}
                uncheckedIcon={<FontIcon ref={item.toString()} className="material-icons" style={{fontSize: iconSize, color: '#D7D7D7'}}>star</FontIcon>}
                style={{width: iconSize}}
                iconStyle={{width: iconSize * factor}}
                inputStyle={{width: "100%"}}
                labelStyle={{width: "100%"}}
                disabled={false}
              />
            ))
          }
          </div>
          {
            showStatis?
            <div style={{paddingTop: 10}}>
              <label style={{fontSize: 30, color: 'black'}}> { rate.toString() } </label>
              <font style={{fontSize: 20, color: '#888888'}}>{' ' + t('shop:productDetail.labelOn') + ' 5'}</font>
              <br/>
              <label style={{fontSize: 14, color: '#888888'}}>{(rating ? rating.length : 0).toString() + ' ' + t('shop:productDetail.labelComment')}&emsp;</label>
            </div> : null
          }
        </div>
        {
          showStarText ?
          <div style={{marginLeft: 10, marginTop: Math.round((iconSize - 16)/2), fontSize: 16, color: '#888888'}}>
            { starText }
          </div> : null
        }
        {
          showStatis?
          <div style={{marginLeft: 10}}>
            {
               deStars.map((item, idx) => (
                 <div key={idx} style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                   <div style={{marginRight: 5, width: 50, fontSize: 14, color: '#888888'}}>{item + ' ' + t('shop:productDetail.labelStar')}</div>
                   <div className="progress" style={{width: 200, height: 15, marginTop: 3}}>
                     <div className="progress-bar" role="progressbar" aria-valuenow={this.getStarPercent(item).toString()}
                      aria-valuemin="0" aria-valuemax="100" style={{backgroundColor: '#fcb826', width: this.getStarPercent(item).toString() + '%'}}>
                     </div>
                   </div>
                   <div style={{width: 50, fontSize: 14, marginLeft: 10, color: '#888888'}}>{' ' + this.getStarCount(item)}</div>
                 </div>
               ))
            }
          </div> : null
        }
      </div>
    )
  }
}

const RATING_STOCK_MODEL = gql`
    mutation ratingStockModel($_id: String!, $rate: Int!){
        ratingStockModel(_id: $_id, rate: $rate)
}`

export default compose (
    graphql(RATING_STOCK_MODEL, {
        props:({mutate})=>({
            ratingStockModel : (_id, rate) => mutate({variables:{_id, rate}})
        })
    }),
)(Rating);
