import * as Rrestore from '../store/store';
import * as type from './actionType';
import * as Utils from '../utils/fetch';


export const LoginInit=()=>{
  return async dispatch=>{
    Rrestore.store.dispatch({
        type:type.LOGIN_INPUT_INIT,
        account:'',
        password:'',
        accountTips:'',
        passwordTips:'',
        buttonTips:'',
        userPermission:''
     });
  };
};


export const Login=(userName,userPassWord)=>{
  return async dispatch=>{
    let res=await Utils.axiosRequest({
        /* url:Utils.prodURL+'oss/user/login', */
        url:Utils.mutilDevURl+'oss/user/login',
        method:'post',
        data:{
            userName:userName,
            password:userPassWord
        }
    });
    if (res.data.code==='0000') {
        Rrestore.store.dispatch({
          type:type.LOGIN,
          userPermission:res.data.dataSource.data.userPermission,
          accountName:res.data.dataSource.data.accountName
       });
    }else{
        Rrestore.store.dispatch({
          type:type.LOGIN_FAILED,
          buttonTips:'请检查用户名和密码!'
        });
    };
  };
};



export const LoadMenu=()=>{
    return async dispatch => {
        let res=await Utils.axiosRequest({
            /* url:Utils.prodURL+'oss/menu/each', */
            url:Utils.mutilDevURl+'oss/menu/each',
            method:'post',
            data:{}
          });
          if (res.data.code==='0000') {
              Rrestore.store.dispatch({
                  type:type.LOAD_MENU,
                  menuArr:res.data.dataSource.data
              });
          };
    };
};

export const activeNode=(node)=>{
   return dispatch=>{
      let openActive=Rrestore.store.getState().leftMenu.activeNode;
      let openMenu=openActive.concat();
      let menuIndex=openMenu.indexOf(node);
      if(menuIndex!==-1)
        openMenu.splice(menuIndex,1);
      else
        openMenu.push(node);
        Rrestore.store.dispatch({
          type:type.ACTIVE_NODE,
          activeNode:openMenu
      });
   };
};

export const openDetails=(node)=>{
   return dispatch=>{
    Rrestore.store.dispatch({
          type:type.OPEN_DETAILS,
          openNode:node
      });
      let right_activeNode_origin=Rrestore.store.getState().rightMenu.activeNode;
      let right_activeNode_now=right_activeNode_origin.concat();
      let menuIndex=JSON.stringify(right_activeNode_origin).indexOf(JSON.stringify(node));
      if(menuIndex===-1){
        right_activeNode_now.push(node);
      };
      Rrestore.store.dispatch({
          type:type.R_OPEN_NODE,
          openNode:node
      });
      Rrestore.store.dispatch({
          type:type.R_ACTIVE_NODE,
          activeNode:right_activeNode_now
      });
   };
};

export const closeNav=(node)=>{
  return dispatch=>{
     let right_activeNode_origin=Rrestore.store.getState().rightMenu.activeNode;
     let right_activeNode_now=right_activeNode_origin.concat();
     let currentIndex;
     right_activeNode_now.forEach((x,i)=>{
        if(Utils.cmp(x,node)===true){
          currentIndex=i;
        };
     });
     let rightArr=Utils.arrayRemove(right_activeNode_now,currentIndex);
     Rrestore.store.dispatch({
         type:type.R_CLOSE_NAV,
         activeNode:rightArr,
         openNode:rightArr[0]===undefined?null:rightArr[0]
     });
  };
};