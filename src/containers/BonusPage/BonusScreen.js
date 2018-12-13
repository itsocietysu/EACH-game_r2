import React from "react";
import {Text, TouchableOpacity, View, Image, Dimensions, ScrollView} from "react-native";
import {withNavigation} from 'react-navigation';

import {StyledButton, ButtonText, TittleText} from "../styles";
import {FormattedMessage} from "react-native-globalize";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import {colors, fonts} from "../../utils/constants";
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps} from "../QuestInfoPage/QuestInfoScreen";
import getFont from "../../utils/getFont";

const PHOTO_BONUS = "photo";
const TEXT_BONUS = "text";
const VIDEO_BONUS = "video";

class Bonus extends React.Component{
    render() {
        const width = Dimensions.get('window').width;
        const bonus = this.props.bonus;
        const fontLoaded = this.props.font;
        // TODO: remove this field
        const next = 'next';
        let content = <View/>;

        switch (bonus.type) {
            case PHOTO_BONUS:
                content =
                    <View>
                        <Image source={{uri: bonus.desc.image.uri}} style={{width: width, height: width}}/>
                    </View>;

                break;
            case TEXT_BONUS:
                content =
                    <View>
                        <Text>{bonus.desc.text}</Text>
                    </View>;
                break;
            case VIDEO_BONUS:
                content =
                    <View>
                        <Text>Here should be video</Text>
                    </View>;
                break;
            default:
                content = <View/>;
                break;
        }
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView>
                    <TittleText
                        font={getFont(fontLoaded, fonts.EACH)}
                        color={'#000000'}>
                        Congratulations!{'\n'}
                        You are right!
                    </TittleText>
                    <View style={{flex: 1}}>{content}</View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestPlay', {next})}>
                            <StyledButton color={'#ffa366'}>
                                <ButtonText color={'#ffffff'}><FormattedMessage message={'Continue'}/></ButtonText>
                            </StyledButton>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withNavigation,
    withConnect,
)(Bonus);
