import {Util} from "expo";
import {Platform} from 'react-native';

export default async function getSystemLocaleAsync(){
    const locale =  await Util.getCurrentLocaleAsync();
    if (Platform.OS === 'android') {
        alert(locale.substring(0, 2));
        return new Promise(resolve => resolve(locale.substring(0,2)));
    }
    else if (Platform.OS === 'ios'){
        alert(locale);
        return new Promise(resolve=>resolve(locale));
    }
    return 'en';
}

