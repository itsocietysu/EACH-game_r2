import {AUTH_CHANGE} from "./constants";

export function changeAuth(authType){
    return{
        type: AUTH_CHANGE,
        authType,
    }
}
