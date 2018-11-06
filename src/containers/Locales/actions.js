import {LANGUAGE_CHANGE} from "./constants";

export function changeLanguage(language){
    return{
        type: LANGUAGE_CHANGE,
        language,
    }
}
