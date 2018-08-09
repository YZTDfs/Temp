import * as type from '../../actions/actionType';

let initState={
    userPermission:'',
    accountName:''
};

export const PanelReducer=(state=initState,action)=>{
    switch (action.type) {
        case type.PANEL_EXIT:
            return initState={
               ...initState,
               userPermission:action.userPermission,
               accountName:action.accountName
            };
        
        default: return state;
    }
};