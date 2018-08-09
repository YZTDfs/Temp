import React, { Component } from 'react';
import Class from './Login.less';
import * as Action from '../../actions/action';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Rrestore from '../../store/store';

class Login extends Component {
  constructor(props,context){
     super(props,context);
     this.Login=this.Login.bind(this);
     this.inputAccount=this.inputAccount.bind(this);
     this.inputPassword=this.inputPassword.bind(this);
     this.blurAccount=this.blurAccount.bind(this);
     this.blurPassword=this.blurPassword.bind(this);
  };

  blurAccount(event){
    if (event.target.value===''){
      Rrestore.store.dispatch({
        type:'LOGIN_ACCOUNT_CHECK',
        accountTips:'账号不能为空!'
      });
     }else{
       Rrestore.store.dispatch({
         type:'LOGIN_ACCOUNT_CHECK',
         accountTips:''
       });
     };
  };

  blurPassword(event){
    if (event.target.value==='') {
      Rrestore.store.dispatch({
         type:'LOGIN_PASSWORD_CHECK',
         passwordTips:'密码不能为空!'
      });
    }else{
      Rrestore.store.dispatch({
         type:'LOGIN_PASSWORD_CHECK',
         passwordTips:''
      });
    };
  };

  inputAccount(event){
     Rrestore.store.dispatch({
        type:'LOGIN_ACCOUNT_INPUT',
        account:event.target.value
     });
     if (event.target.value===''){
      Rrestore.store.dispatch({
         type:'LOGIN_ACCOUNT_CHECK',
         accountTips:'账号不能为空!'
      });
     }else{
       Rrestore.store.dispatch({
          type:'LOGIN_ACCOUNT_CHECK',
          accountTips:''
       });
     };
  };

  inputPassword(event){
     Rrestore.store.dispatch({
       type:'LOGIN_PASSWORD_INPUT',
       password:event.target.value
     });
     if (event.target.value==='') {
       Rrestore.store.dispatch({
         type:'LOGIN_PASSWORD_CHECK',
         passwordTips:'密码不能为空!'
       });
     }else{
       Rrestore.store.dispatch({
         type:'LOGIN_PASSWORD_CHEKC',
         passwordTips:''
       });
     };
  };

  async Login (){
    let userName=this.props.account;
    let userPassWord=this.props.password;
    Rrestore.store.dispatch(Action.Login(userName,userPassWord));  
  };

  componentWillMount(){
    Rrestore.store.dispatch(Action.LoginInit());
  };

  render() {
    return (
      <div className={Class.main}>
        <div className={Class.loginIMG}>
          
        </div>
        <div className={Class.loginBox}>
          <nav className={Class.boxTitle}>
            <p>OSS运营管理系统</p>
          </nav>
          <article className={Class.boxContent}>
            <input className={Class.userName} placeholder='请输入账号' type="text" value={this.props.account} onChange={this.inputAccount} onBlur={this.blurAccount}/>
            <p id='userNameError' className={Class.errorTips}>{this.props.accountTips}</p>
            <input className={Class.userPwd} placeholder='请输入密码' type="password" value={this.props.password} onChange={this.inputPassword} onBlur={this.blurPassword}/>
            <p id='passwordError' className={Class.errorTips}>{this.props.passwordTips}</p>
            <button className={Class.loginBtn} onClick={this.Login}>登陆</button>
            <p id='buttonTips' className={Class.errorTips}>{this.props.buttonTips}</p>
          </article>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return {
    account:state.Login.account,
    password:state.Login.password,
    accountTips:state.Login.accountTips,
    passwordTips:state.Login.passwordTips,
    buttonTips:state.Login.buttonTips,
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
)(Login))
