import {THEME_CHANGE} from "../constants/themeConstants";

export function changeTheme(themeType){
    return{
        type: THEME_CHANGE,
        themeType,
    }
}
