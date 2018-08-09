import React, { Component } from 'react';
import Class from './main.less';
import LeftMenu from '../leftMenu/leftMenu';
/* import Details from '../details/details';
import News from '../news/news'; */
import Nav from '../nav/navBar';
import RightMenu from '../rightMenu/rightMenu';
/* import NotFound from '../notFound/notFound';
import {Route,Switch,NavLink,Redirect,BrowserRouter} from 'react-router-dom'; */

export default class Main extends Component {
  /* constructor(props,context){
    super(props,context);
  }; */
  render() {
    return (
      <div className={Class.main}>
        <nav className={Class.main_nav}>
          <Nav />
        </nav>
        <article className={Class.main_article}>
         <LeftMenu />
         <RightMenu />
        </article>
      </div>
    )
  }
}

/* 
* <Switch>
    <Route exact path='/index/BUS_open' component={Details}/>
    <Route exact path='/index/news' component={News}/>
    <Route exact path='/index/notFound' component={NotFound}/>
    <Redirect to='/index/notFound' />
  </Switch>
*/
