import * as type from '../../actions/actionType';

let initState={
    menuArr: [],
    activeNode:[],
    openNode:{}
}

export const leftMenuReducer = (state = initState, action) => {
    switch (action.type) {
        case type.LOAD_MENU:
            let preStore=JSON.parse(sessionStorage.getItem('persist:root'));
            let leftMenuStore=JSON.parse(preStore.leftMenu);
            return initState={
                ...initState,
                activeNode:leftMenuStore.activeNode,
                menuArr:action.menuArr
            };
        case type.OPEN_DETAILS:
            return initState={
                ...initState,
                openNode:action.openNode
            };
        case type.ACTIVE_NODE:
            return initState={
                ...initState,
                activeNode:action.activeNode
            };
        case type.LOGIN_EXIT:
            return initState={
                ...initState,
                activeNode:[],
                openNode:{}
            };
        default: return state;
    }
};