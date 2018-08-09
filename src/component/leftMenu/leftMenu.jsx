import React, { Component } from 'react';
import Class from './leftMenu.less';
import * as images from '../../img/index';
//import * as Utils from '../../utils/fetch';
// import * as Action from '../../actions/actionType';
import * as Action from '../../actions/action';
import {NavLink,withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Rrestore from '../../store/store';



class LeftMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSecMenu=this.onSecMenu.bind(this);
    this.openDetails=this.openDetails.bind(this);
  };
  
  onSecMenu(e){
    let curId=e.currentTarget.getAttribute('data-id');
    Rrestore.store.dispatch(Action.activeNode(curId));
  };

  openDetails(e){
    let curId=e.currentTarget.getAttribute('data-to');
    let curText=e.currentTarget.innerHTML;
    Rrestore.store.dispatch(Action.openDetails({curId:curId,curText:curText}));
  };

  createMenu_new(res){
    let items=[];
    if (res!==undefined) {
      res.forEach((e) => {
        let list=[];
        let renderState;
        let secMenuState=this.props.activeNode.indexOf(e.id);
        secMenuState===-1?renderState=false:renderState=true;
        e.sec_menu.forEach((x)=>{
            list.push(
              <NavLink data-to={x.id} key={x.id} to={`/index/${x.id}`} className={Class.menu2ndDefault} activeClassName={Class.active} onClick={this.openDetails}>
               {x.title}
              </NavLink> 
            );
        });
        items.push(
          <nav id={e.id} className={Class.menu1st} key={e.id}>
            <div data-id={e.id} className={Class.menu1stTitle} onClick={this.onSecMenu}>
              <img src={images[''+e.id+'']} alt='icon' />
              <p>{e.title}</p>
            </div>
            <div sec-id={`${e.id}${renderState===true?'On':'Off'}`} className={`${Class.menu2nd} ${renderState===true?Class.ndShow:Class.ndHide}`}>
              {list}
            </div>
          </nav>
        )
      });
    };
    items.push(
      <nav className={Class.menu1stWhite} key='whiteBlank'>
        <div className={Class.menu1stWhite}></div>
      </nav>
    )
    return items;
  };

  async componentWillMount() {
    Rrestore.store.dispatch(Action.LoadMenu());
  };

  shouldComponentUpdate(){
     return true;
  };
  
  render() {
    return (
      <div className={Class.main}>
        {this.createMenu_new(this.props.menuArr)}
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    menuArr:state.leftMenu.menuArr,
    activeNode:state.leftMenu.activeNode,
    openNode:state.leftMenu.openNode
  }
};

const mapDispatchToProps=(dispatch)=>{
  return {
    action:bindActionCreators(Action,dispatch)
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu))
