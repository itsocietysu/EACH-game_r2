import {FormattedMessage} from "react-native-globalize";
import React from "react";
import {View} from "react-native";
import {MarkText} from "../containers/styles";
import {colors, fonts} from "./constants";

export function renderMark(mark){
    switch (mark){
        case 'none':
            return <View/>;
        case 'process':
            return <MarkText color={colors.MAIN} font={fonts.MURRAY}><FormattedMessage message={'Process'}/></MarkText>;
        case 'passed':
            return <MarkText color={colors.ACCEPTED} font={fonts.MURRAY}><FormattedMessage message={'Passed'}/></MarkText>;
        default:
            return <View/>;
    }
}
