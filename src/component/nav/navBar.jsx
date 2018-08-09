import React, { Component } from 'react';
import Class from './navBar.less';
import * as image from '../../img/index';
import Panel from '../nav_user_panel/panel';

export default class NavBar extends Component {
    /* componentWillUpdate(){
        console.log('nav_will_update!');
    }
    componentDidUpdate(){
        console.log('nav_update!');
    }; */
    render() {
        return (
            <div className={Class.main}>
                <div>
                  <img src={image.logo} alt="OSS运营管理系统"/>
                  <p>OSS运营管理系统</p>
                </div>
                <Panel  />
            </div>
        )
    }
}
