import React from "react";
import {Text, TouchableOpacity, View, Image, Dimensions, ScrollView} from "react-native";
import {withNavigation} from 'react-navigation';

import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {colors, fonts} from "../../utils/constants";
import connect from "react-redux/es/connect/connect";
import messages from "../../Messages";
import ArrowButton from "../../components/Button/ArrowButton";
import styled from "styled-components/native";
import {updateCurrentStep} from "../../redux/actions/gameStepActions";
import {makeSelectGameStep} from "../../redux/selectors/gameStepSelectors";
import {BonusText} from "../styles";
import {updateStatistics} from "../../utils/updateStatistics";
import VideoComponent from "../../components/Video/VideoComponent";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const PHOTO_BONUS = "photo";
const TEXT_BONUS = "text";
const VIDEO_BONUS = "video";

export const TittleText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: 30
    textAlign: center
`;

const ButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
`;

class Bonus extends React.Component{
    state = {
        finish: false,
    };

    async _onPress(){
        const updateResult = await updateStatistics(this.props.gameID, this.props.currentStep+1);
        if(this.props.currentStep === this.props.stepsAmount - 1)
            this.props.navigation.navigate('Finish', {game_id: this.props.gameID, gameData: updateResult});
        else
        {
            this.props.incrementStep(this.props.currentStep + 1);
            this.props.navigation.navigate('QuestPlay')
        }
    }

    render() {
        const {width, height} = Dimensions.get('window');
        const bonus = this.props.bonus;
        const theme = this.props.theme;
        let content = <View/>;

        switch (bonus.type) {
            case PHOTO_BONUS:
                content =
                    <View>
                        <Image source={{uri: bonus.desc.image.uri}} style={{resizeMode: 'contain', width: wp('80%'), height: wp('80%')}}/>
                    </View>;

                break;
            case TEXT_BONUS:
                content =
                    <ScrollView style={{flex: 1}}>
                        <BonusText color={colors.TEXT[theme]} font={fonts.MURRAY}>{bonus.desc.text}</BonusText>
                    </ScrollView>;
                break;
            case VIDEO_BONUS:
                content =
                    <View style={{flex: 1}}>
                        <VideoComponent videoUrl={bonus.desc.uri} width={wp('100%')} height={wp('100%')}/>
                        {/* <VideoComponent videoUrl={"https://www.1tv.ru/embed/353058:11"}/> https://www.youtube.com/watch?time_continue=3&v=UtKsyLk45uA*/}
                    </View>;
                break;
            default:
                content = <View/>;
                break;
        }
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1, backgroundColor: colors.BASE[theme], alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: '100%', height: '20%', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10}}>
                        <TittleText
                            font={fonts.MURRAY}
                            color={colors.MAIN}
                        >
                            <FormattedMessage message={'Correct'}/>
                        </TittleText>
                    </View>
                    {content}
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15}}>
                        <ArrowButton
                            onPress={()=>this._onPress()}
                            bgColor={colors.BASE[theme]}
                            borderColor={colors.MAIN}
                            width={width*0.55}
                            height={height*0.075}
                        >
                            <ButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                                <FormattedMessage message={'Continue'}/>->
                            </ButtonText>
                        </ArrowButton>
                    </View>
                </View>
            </FormattedWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
    currentStep: makeSelectGameStep(),
});

export function mapDispatchToProps(dispatch){
    return{
        incrementStep: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(updateCurrentStep(evt))
        }
    }
}
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withNavigation,
    withConnect,
)(Bonus);
