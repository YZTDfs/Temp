import React, { Component } from 'react'
import { BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import Main from '../component/main/main';
import Login from '../component/Login/Login';
import * as Rrestore from '../store/store';

export default class Routers extends Component {
    constructor(props,context){
        super(props,context);
        this.isLogin=this.isLogin.bind(this);
    };

    isLogin(){
        if (Rrestore.store.getState().Login.userPermission==='') {
           return false;
        }else{
           return true;
        }
    };
    

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={this.isLogin()?'/index':'/login'} component={this.isLogin()?Main:Login} />
                    <Route exact path='/login' component={Login}/>
                    <Redirect to='/login' />
                </Switch>
            </BrowserRouter>
        )
    }
}
