import React from "react";
import {View} from "react-native";
import Flag from "react-native-flags";

import {SettingsText} from "../containers/styles";
import {colors, fonts, languages} from "./constants";

export const getKeyByValue = (object, value) =>  Object.keys(object).find(key => object[key] === value);

const getFlagCode = (locale) => {
    if (locale === 'en')
        return 'US';
    return locale.toUpperCase();
};

export const renderRow = (option, index, isSelected) => {
    const flagId = getKeyByValue(languages, option);
    const flagCode = getFlagCode(flagId);
    return (
        <View style={{flexDirection: 'row', paddingLeft: 5, paddingRight: 15}}>
            <Flag
                code={flagCode}
                size={32}
            />
            <View style={{alignItems: 'center', justifyContent: 'center', paddingLeft: 5}}>
                <SettingsText color={colors.MAIN} font={fonts.MURRAY}>{option}</SettingsText>
            </View>
        </View>
    );
};
