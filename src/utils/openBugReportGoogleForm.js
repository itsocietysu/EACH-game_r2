import {WebBrowser} from "expo";
import {bug_report_url} from "./constants";

export const openBugReportGoogleForm = () =>{
    WebBrowser.openBrowserAsync(bug_report_url)
};
