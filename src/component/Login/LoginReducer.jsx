import * as type from '../../actions/actionType';

let initState={
    account:'',
    password:'',
    accountTips:'',
    passwordTips:'',
    buttonTips:'',
    userPermission:'',
    accountName:''
};

export const LoginReducer=(state=initState,action)=>{
    switch (action.type) {
        case type.LOGIN:
            window.location.href='/index';
            return initState={
               ...initState,
               userPermission:action.userPermission,
               accountName:action.accountName
            };

        case type.LOGIN_FAILED:
            return initState={
               ...initState,
               buttonTips:action.buttonTips
            };

        case type.LOGIN_INPUT_INIT:
             return initState={
                 ...initState,
                 account:'',
                 password:'',
                 accountTips:'',
                 passwordTips:'',
                 buttonTips:'',
                 userPermission:'',
             };

        case type.LOGIN_ACCOUNT_CHECK:
            return initState={
                ...initState,
                accountTips:action.accountTips
            };
        
        case type.LOGIN_PASSWORD_CHECK:
            return initState={
               ...initState,
               passwordTips:action.passwordTips
            };

        case type.LOGIN_ACCOUNT_INPUT:
            return initState={
               ...initState,
               account:action.account
            };

        case type.LOGIN_PASSWORD_INPUT:
            return initState={
              ...initState,
              password:action.password
            };

        case type.LOGIN_EXIT:
            return initState={
                ...initState,
                userPermission:''
            };
        
        default: return state;
    }
};