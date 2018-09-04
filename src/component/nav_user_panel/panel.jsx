import React, { Component } from 'react'
import Class from './panel.less';
import * as Action from '../../actions/action';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Utils from '../../utils/fetch';
import * as Rrestore from '../../store/store';

class Panel extends Component {
  constructor(props,context){
    super(props,context);
    this.exitSystem=this.exitSystem.bind(this);
  };
  
  async exitSystem(){
    
    let res=await Utils.axiosRequest({
      url:Utils.prodURL+'oss/user/logout',
      method:'post',
      data:{}
    });
    if (res.data.code==='0000') {
      window.location.href='/login';
      Rrestore.store.dispatch({
       type:'LOGIN_EXIT',
       userPermission:''
      });
    };
  };

  render() {
    return (
      <div className={Class.main}>
        <div className={Class.eachPanel}>{this.props.accountName}</div>
        <span>|</span>
        <div className={Class.eachPanel} >修改密码</div>
        <span>|</span>
        <div className={Class.eachPanel} onClick={this.exitSystem}>退出</div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    accountName:state.Login.accountName,
    userPermission:state.Login.userPermission
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
)(Panel))
