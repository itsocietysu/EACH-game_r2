import {Localization} from "expo";
import {Platform} from 'react-native';

export default async function getSystemLocaleAsync(){
    const locale =  await Localization.getLocalizationAsync();
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
        return new Promise(resolve => resolve(locale.locale.substring(0,2)));
    }
    return 'en';
}

