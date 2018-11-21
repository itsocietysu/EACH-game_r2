import {THEME_CHANGE} from "./constants";

export function changeTheme(themeType){
    return{
        type: THEME_CHANGE,
        themeType,
    }
}
