import {AUTH_CHANGE} from "./constants";

export function changeAuth(auth){
    return{
        type: AUTH_CHANGE,
        auth,
    }
}
