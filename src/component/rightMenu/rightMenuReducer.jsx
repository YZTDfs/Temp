import * as type from '../../actions/actionType';

let initState = {
    openNode:{},
    activeNode:[],
    dataArr:[]
};

export const rightMenuReducer= (state = initState, action) => {
    switch (action.type) {
        case type.R_OPEN_NODE:
            return initState={
                ...initState,
                openNode:action.openNode
            };
        case type.R_ACTIVE_NODE:
            return initState={
                ...initState,
                activeNode:action.activeNode
            };
        case type.R_CLOSE_NAV:
            return initState={
                ...initState,
                openNode:action.openNode,
                activeNode:action.activeNode
            };
        case type.LOGIN_EXIT:
            return initState={
               ...initState,
               openNode:{},
               activeNode:[],
               dataArr:[]
            };
        default: return state;
    }
};