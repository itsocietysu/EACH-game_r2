import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";

import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";

import {Rectangle, FinishTitleText, QuestButtonText, CommentTextInput} from "../styles";
import {colors, fonts, MAX_COMMENT_INPUT_LENGTH} from "../../utils/constants";
import messages from "../../Messages";

import BonusTuple from "./BonusTuple";
import RankTuple from "./RankTuple";
import TimeTuple from "./TimeTuple";
import ArrowButton from "../../components/ArrowButton";

import {updateFeedback} from "../../utils/updateFeedback";
import {showMessage} from "react-native-flash-message";
import {updateStatistics} from "../../utils/updateStatistics";

class QuestFinalScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            stars: 0,
            length: 0,
            comment: null,
        };
        this._onPress = this._onPress.bind(this);
    }

    async _onPress(){
        if (this.state.stars !== 0) {
            const gameId = this.props.navigation.getParam('game_id', '');
            const isFeedbackUpdated = await updateFeedback(gameId, this.state.stars, this.state.comment);
            this.props.navigation.navigate('Museums')
        }
        else
            showMessage({
                message: <FormattedMessage message={'ErrRate'}/>,
                type: "info",
            });
    }

    renderComment(){
        return(
            (this.state.stars !== 0) ?
                <View style={{flex: 1, alignItems: 'center'}}>
                    <FinishTitleText color={colors.MAIN} font={fonts.MURRAY}>
                        <FormattedMessage message={'Comment'}/>
                    </FinishTitleText>
                    <CommentTextInput
                        multiline
                        blurOnSubmit
                        underlineColorAndroid="transparent"
                        maxLength={MAX_COMMENT_INPUT_LENGTH}
                        selectionColor={colors.MAIN}
                        onChangeText={(text => this.setState({comment: text, length: (text.length<250)? text.length : 250}))}
                        font={fonts.MURRAY}
                        color={colors.MAIN}
                    />
                    <Text style={{textAlign: 'right'}}>{this.state.length}/{MAX_COMMENT_INPUT_LENGTH}</Text>
                </View> :
                <View/>
        )
    }
    render(){
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        const gameData = this.props.navigation.getParam('gameData','');
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled>
                <View style={{height: '100%', backgroundColor: colors.BASE[theme]}}>
                    <FormattedWrapper locale={this.props.locale} messages={messages}>
                        <View style={{height: '18%', alignItems: 'center', paddingTop: 5}}>
                            <FinishTitleText color={colors.MAIN} font={fonts.MURRAY}>
                                <FormattedMessage message={'Finish'}/>
                            </FinishTitleText>
                        </View>
                        <Rectangle width={'100%'} height={1} backgroundColor={colors.MAIN}/>
                        <View style={{height: '20%', padding: 5}}>
                            <TimeTuple time={gameData.best_time}/>
                            <BonusTuple bonus={gameData.bonus}/>
                            <RankTuple/>
                        </View>
                        <Rectangle width={'100%'} height={1} backgroundColor={colors.MAIN}/>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'center', paddingTop: 5}}>
                                <FinishTitleText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'Rate'}/>
                                </FinishTitleText>
                            </View>
                            <Stars
                                default={0}
                                count={5}
                                spacing={20}
                                fullStar={<FontAwesome name="star" size={0.7/10.5*height} color={colors.MAIN}/>}
                                emptyStar={<FontAwesome name="star-o" size={0.7/10.5*height} color={colors.MAIN}/>}
                                update={(val)=>{this.setState({stars: val})}}
                            />
                            {this.renderComment()}
                            <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
                                <ArrowButton
                                    onPress={this._onPress}
                                    bgColor={colors.BASE[theme]}
                                    borderColor={colors.MAIN}
                                    width={width*0.55}
                                    height={height*0.075}
                                >
                                    <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                                        <FormattedMessage message={'End'}/>
                                    </QuestButtonText>
                                </ArrowButton>
                            </View>
                        </View>
                    </FormattedWrapper>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose( withNavigation, withConnect)(QuestFinalScreen);
