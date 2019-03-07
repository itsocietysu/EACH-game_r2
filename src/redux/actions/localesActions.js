import {LANGUAGE_CHANGE} from "../constants/localesConstants";

export function changeLanguage(language){
    return{
        type: LANGUAGE_CHANGE,
        language,
    }
}
