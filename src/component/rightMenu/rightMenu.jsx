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

const BUS_ops_flow=business.business.BUS_ops_flow;
const BUS_pay_penalty=business.business.BUS_pay_penalty;
const BUS_pay_query=business.business.BUS_pay_query;
const REC_crash_rec=business.business.REC_crash_rec;
const REC_file_manage=business.business.REC_file_manage;
const REC_file_send=business.business.REC_file_send;
const REC_general_manage=business.business.REC_general_manage;
const REC_refund_regist=business.business.REC_refund_regist;
const REC_rolling_manage=business.business.REC_rolling_manage;
const TER_bus_ops=business.business.TER_bus_ops;
const TER_evdo_manage=business.business.TER_evdo_manage;
const TER_hard_moni=business.business.TER_hard_moni;
const TER_manager=business.business.TER_manager;
const OPS_ops_manage=business.business.OPS_ops_manage;
const OPS_area_manage=business.business.OPS_area_manage;
const CTX_adv_manage=business.business.CTX_adv_manage;
const CTX_announce_manage=business.business.CTX_announce_manage;
const SYS_bus_manage=business.business.SYS_bus_manage;
const SYS_HandleCode_manage=business.business.SYS_HandleCode_manage;
const SYS_menu_manage=business.business.SYS_menu_manage;
const SYS_merchant_manage=business.business.SYS_merchant_manage;
const SYS_org_manage=business.business.SYS_org_manage;
const SYS_ReturnCode_manage=business.business.SYS_ReturnCode_manage;
const SYS_role_manage=business.business.SYS_role_manage;
const SYS_TerChannel_manage=business.business.SYS_TerChannel_manage;
const SYS_TerModules_manage=business.business.SYS_TerModules_manage;
const SYS_TerRegion_manage=business.business.SYS_TerRegion_manage;
const SYS_user_manage=business.business.SYS_user_manage;
const RouteGeneric = (route) => (
      <Route path={route.path} exact={route.exact} component={route.component} />
      );
class RightMenu extends Component {
  constructor(props,context){
    super(props,context);
    this.closeNav_short=this.closeNav_short.bind(this);
    this.goBack=this.goBack.bind(this);
    this.renderRouter=this.renderRouter.bind(this);
    this.getRouterRender=this.getRouterRender.bind(this);
    this.dynamicRender=this.dynamicRender.bind(this);
    this.dynamicRouteConfi=[];
  };
  
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

  /* routerDynamic */
   renderRouter(routerClass){
     switch (routerClass) {
       case 'BUS_ops_flow':
         return BUS_ops_flow;
       case 'BUS_pay_penalty':
         return  BUS_pay_penalty;
       case 'BUS_pay_query':
         return BUS_pay_query;
       case 'REC_crash_rec':
         return REC_crash_rec;
       case 'REC_file_manage':
         return  REC_file_manage;
       case 'REC_file_send':
         return REC_file_send;
       case 'REC_general_manage':
         return REC_general_manage;
       case 'REC_refund_regist':
         return  REC_refund_regist;
       case 'REC_rolling_manage':
         return REC_rolling_manage;
       case 'TER_bus_ops':
         return TER_bus_ops;
       case 'TER_evdo_manage':
         return TER_evdo_manage;
       case 'TER_hard_moni':
         return  TER_hard_moni;
       case 'TER_manager':
         return TER_manager;
       case 'OPS_ops_manage':
         return OPS_ops_manage;
       case 'OPS_area_manage':
         return OPS_area_manage;
       case 'CTX_adv_manage':
         return CTX_adv_manage;
       case 'CTX_announce_manage':
         return CTX_announce_manage;
       case 'SYS_bus_manage':
         return SYS_bus_manage;
       case 'SYS_HandleCode_manage':
         return SYS_HandleCode_manage;
       case 'SYS_menu_manage':
         return SYS_menu_manage;
       case 'SYS_merchant_manage':
         return SYS_merchant_manage;
       case 'SYS_org_manage':
         return SYS_org_manage;
       case 'SYS_ReturnCode_manage':
         return SYS_ReturnCode_manage;
       case 'SYS_role_manage':
         return SYS_role_manage;
       case 'SYS_TerChannel_manage':
         return SYS_TerChannel_manage;
       case 'SYS_TerModules_manage':
         return SYS_TerModules_manage;
       case 'SYS_TerRegion_manage':
         return SYS_TerRegion_manage;
       case 'SYS_user_manage':
         return SYS_user_manage;
       default:
         break;
     };
   };
  /* end */
  getRouterRender(){
    let menuArr=Rrestore.store.getState().leftMenu.menuArr;
    const menuList=[];
    menuArr.forEach(x=>{
      x.sec_menu.forEach(y=>{
        menuList.push(y.id);
      });
    });
  };
  /* dymanticRouter */
  async dynamicRender(){
    let menuArr=Rrestore.store.getState().leftMenu.menuArr;
    //TODO:
    //console.log(menuArr);
    /* let menuArr=await Utils.axiosRequest({

    }) */
    const menuList=[];
    menuArr.forEach(x=>{
      x.sec_menu.forEach(y=>{
        menuList.push(y.id);
      });
    });
    menuList.forEach(x=>{
      this.dynamicRouteConfi.push(
        {
          path:`/index/${x}`,
          exact:true,
          component:this.renderRouter(x)
        }
      )
    });
  };
  /* end */
  
  componentWillMount(){
   this.dynamicRender();
  };

  render() {
    const routes=this.dynamicRouteConfi;
    //TODO:
    //console.log(routes);
    return (
      <article className={Class.main}>
        <nav className={Class.detailsNav}>
            {this.createNavMenu(this.props)}
        </nav>
        <Switch>
           {routes.map((route,i)=><RouteGeneric key={i} {...route} />)}
           <Route exact path='/index/notFound' component={NotFound} />
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


