import axios from 'axios';

/* axios.defaults.withCredentials = true */
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

export const devURL='http://192.168.20.185:9777/oss/';
export const mutilDevURl='http://192.168.20.185:9777/';
