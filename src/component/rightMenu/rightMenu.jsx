import React, { Component } from 'react';
import * as Class from './rightMenu.less';
/* test */
// import Details from '../details/details';
import News from '../news/news';
import NotFound from '../notFound/notFound';
/* end */
import * as business from '../businessComponent/business';
import * as Utils from '../../utils/fetch';
import {NavLink,Route,Redirect,Switch,withRouter} from 'react-router-dom';
import * as Rrestore from '../../store/store';
import * as Action from '../../actions/action';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class RightMenu extends Component {
  constructor(props,context){
    super(props,context);
    this.closeNav_short=this.closeNav_short.bind(this);
    this.goBack=this.goBack.bind(this);
    /* this.routerDynamic=this.routerDynamic.bind(this); */
  }
  
  goBack(){
    this.props.history.goBack();
  };

  closeNav_short(e){
    let curId=e.currentTarget.getAttribute('data-to');
    let curText=e.currentTarget.innerHTML;
    Rrestore.store.dispatch(Action.closeNav({curId:curId,curText:curText}));
    let now_props=this.props.activeNode.concat();
    let closeNav={curId:curId,curText:curText};
    let currentIndex;
    now_props.forEach((x,i)=>{
      if(Utils.cmp(x,closeNav)===true){
        currentIndex=i;
      };
    });
    let nextArr=Utils.arrayRemove(now_props,currentIndex);
    this.props.history.push(`/index/${nextArr[0]===undefined?null:nextArr[0].curId}`);
  };

  createNavMenu(e){
    let activeNode=e.activeNode;
    let list=[];
    activeNode.forEach(x=>{
      list.unshift(
        <NavLink data-class='nav' key={x.curId} data-to={x.curId} onDoubleClick={this.closeNav_short} to={`/index/${x.curId}`} className={Class.defaultTitle} activeClassName={Class.active}>{x.curText}</NavLink>
      )
    });
     return list;
  };

  
 /*  routerDynamic = (route) => (
    <Route
      key={route.id}
      exact={true}
      path={route.path}
      render={props => (
          <route.component {...props} routes={route.routes || null} />
      )}
    />
  ); */
  
  /* componentWillMount(){
    console.log(business.business);
  }; */

  render() {
    return (
      <article className={Class.main}>
        <nav className={Class.detailsNav}>
            {this.createNavMenu(this.props)}
        </nav>
        <Switch>
            <Route exact path='/index/BUS_ops_flow' component={business.business.BUS_ops_flow} />
            <Route exact path='/index/BUS_pay_penalty' component={business.business.BUS_pay_penalty}/>
            <Route exact path='/index/BUS_pay_query' component={business.business.BUS_pay_query}/>
            <Route exact path='/index/notFound' component={NotFound} />
            <Route exact path='/index/REC_crash_rec' component={business.business.REC_crash_rec}/>
            <Route exact path='/index/REC_file_manage' component={business.business.REC_file_manage}/>
            <Route exact path='/index/REC_file_send' component={business.business.REC_file_send}/>
            <Route exact path='/index/REC_general_manage' component={business.business.REC_general_manage}/>
            <Route exact path='/index/REC_refund_regist' component={business.business.REC_refund_regist}/>
            <Route exact path='/index/REC_rolling_manage' component={business.business.REC_rolling_manage}/>
            <Route exact path='/index/TER_bus_ops' component={business.business.TER_bus_ops}/>
            <Route exact path='/index/TER_evdo_manage' component={business.business.TER_evdo_manage}/>
            <Route exact path='/index/TER_hard_moni' component={business.business.TER_hard_moni}/>
            <Route exact path='/index/TER_manager' component={business.business.TER_manager}/>
            <Route exact path='/index/OPS_ops_manage' component={business.business.OPS_ops_manage}/>
            <Route exact path='/index/OPS_area_manage' component={business.business.OPS_area_manage}/>
            <Route exact path='/index/CTX_adv_manage' component={business.business.CTX_adv_manage}/>
            <Route exact path='/index/CTX_announce_manage' component={business.business.CTX_announce_manage}/>
            <Route exact path='/index/SYS_bus_manage' component={business.business.SYS_bus_manage}/>
            <Route exact path='/index/SYS_HandleCode_manage' component={business.business.SYS_HandleCode_manage}/>
            <Route exact path='/index/SYS_menu_manage' component={business.business.SYS_menu_manage}/>
            <Route exact path='/index/SYS_merchant_manage' component={business.business.SYS_merchant_manage}/>
            <Route exact path='/index/SYS_org_manage' component={business.business.SYS_org_manage}/>
            <Route exact path='/index/SYS_ReturnCode_manage' component={business.business.SYS_ReturnCode_manage}/>
            <Route exact path='/index/SYS_role_manage' component={business.business.SYS_role_manage}/>
            <Route exact path='/index/SYS_TerChannel_manage' component={business.business.SYS_TerChannel_manage}/>
            <Route exact path='/index/SYS_TerModules_manage' component={business.business.SYS_TerModules_manage}/>
            <Route exact path='/index/SYS_TerRegion_manage' component={business.business.SYS_TerRegion_manage}/>
            <Route exact path='/index/SYS_user_manage' component={business.business.SYS_user_manage}/>
            <Redirect to='/index/notFound' />
        </Switch>
      </article>
    )
  }
};

const mapStateToProps = (state) => ({
   openNode:state.rightMenu.openNode,
   activeNode:state.rightMenu.activeNode
});

const mapDispatchToProps = (dispatch) => {
   return {
     action:bindActionCreators(Action,dispatch)
   }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RightMenu))


