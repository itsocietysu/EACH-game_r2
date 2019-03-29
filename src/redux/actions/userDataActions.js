import {LOAD_USER_DATA} from "../constants/userDataConstants";

export function loadUserData(data) {
    return {
        type: LOAD_USER_DATA,
        userData: data,
    };
}

