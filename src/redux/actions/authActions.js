import {AUTH_CHANGE} from "../constants/authConstants";

export function changeAuth(auth){
    return{
        type: AUTH_CHANGE,
        auth,
    }
}
