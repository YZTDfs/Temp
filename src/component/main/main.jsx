import React, { Component } from 'react';
import Class from './main.less';
import LeftMenu from '../leftMenu/leftMenu';

import Nav from '../nav/navBar';
import RightMenu from '../rightMenu/rightMenu';

export default class Main extends Component {

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

