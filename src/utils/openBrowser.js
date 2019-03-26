import {WebBrowser} from "expo";
import {user_agreement_url} from "./constants";

export const openBrowser = (url) =>{
    WebBrowser.openBrowserAsync(url)
};
