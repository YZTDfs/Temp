import * as types from '../types/test'

const initialState={
    add:1
};

export const test = (state=initialState,action) => {
    switch (action.type) {
        case types.CLIKC:
            return {
                ...initialState,
                tabBarIndex: action.selectedIndex
            }
    
       case types.LOADINGMENU:
            return {
               
            }

      default:
           return state;
    }
};