import axios from 'axios';

axios.defaults.withCredentials = true
/* axios.defaults.headers = {"Content-Type": "application/x-www-form-urlencoded"}; */
axios.defaults.crossDomain = true;
export const fetchAsync = async (url, method, data) => {
    let options, str;
    if (method === 'POST') {
        options = {
            method: 'POST',
            mode: 'cors',
            headers: Headers,
            body: JSON.stringify(data)
        };
    } else if (method === 'GET') {
        if (typeof data === 'object') {
            Object.keys(data).forEach((key) => {
                str += `${key}=${data[key]}&`;
            });
            str = str.substr(0, str.length - 2);
            options = {
                method: 'GET',
                mode: 'cors',
                headers: Headers,
                body: str
            };
        } else {
            options = {
                method: 'GET',
                mode: 'cors',
                headers: Headers,
                body: data
            };
        };
        try {
            let res = await fetch(url, options);
            let result = await res.json();
            return result;
        } catch (error) {
            return error;
        }
    };
}

export const axiosRequest = async (options) =>{
  return axios.request(options);
}

export const cmp=(x,y)=>{
        if ( x === y ) { 
         return true; 
        };
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) { 
         return false; 
        };
        if ( x.constructor !== y.constructor ) { 
         return false; 
        };
        for ( let p in x ) { 
         if ( x.hasOwnProperty( p ) ) { 
          if ( ! y.hasOwnProperty( p ) ) { 
           return false; 
          };
          if ( x[ p ] === y[ p ] ) { 
           continue; 
          }; 
          if ( typeof( x[ p ] ) !== "object" ) { 
           return false; 
          }; 
          if ( ! Object.equals( x[ p ], y[ p ] ) ) { 
           return false; 
          }; 
         };
        };
        for ( let p in y ) { 
         if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) { 
         return false; 
         }; 
        };
        return true; 
};

export const arrayRemove=(arr,index)=>{
    for(let i =0;i <arr.length;i++){
        let temp = arr[i];
        if(!isNaN(index)){
        temp=i;
        };
        if(temp === index){
        for(let j = i;j <arr.length;j++){
            arr[j]=arr[j+1];
        };
        arr.length = arr.length-1;
        };
    };
    return arr;
};

export const findKey=(value,object,existKey)=>{
    for (let n in object) {
        if(object[n]===value){
          return object[existKey];
        };
    };
 };

export const whiteToNull=(data)=>{
    if (data!==null) {
        if (data.length===0) {
            return null;
        }else{
            return data;
        }
    }else{
        return null;
    }
};

export const noWhite=(value)=>{
  let reg=/\s/;
  if (reg.test(value)) {
      return false
  }else{
      return true
  }
};

export const uuid=()=>{
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    };
    s[14] = parseInt(10*Math.random(),10);
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
};
export const prodURL='http://192.168.30.5:8080/';
export const devURL='http://localhost:9777/oss/';
export const mutilDevURl='http://192.168.20.185:9777/';
export const testDevURL='http://192.168.20.59:8080/';
/* export const testDevURL='http://192.168.20.59:8080/'; */
/* export const mutilDevURl='http://192.168.42.2:9777/'; */
export const amapKey='dd69022204521eef8840e3213fda440e';
/* warningTypeEnu */
export const warn300={
    msg:'接口异常!',
    desc:'啊哦，接口出现问题!'
};
export const warn500={
    msg:'操作失败!',
    desc:'您无权进行此项操作!'
};
export const error={
    msg:'接口异常!',
    desc:'网络异常!'
};
/* end */