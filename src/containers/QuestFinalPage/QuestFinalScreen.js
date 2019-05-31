import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import {FormattedMessage} from "react-native-globalize";

import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import {Rectangle, FinishTitleText, QuestButtonText, CommentTextInput} from "../styles";
import {colors, fonts, MAX_COMMENT_INPUT_LENGTH} from "../../utils/constants";

import BonusTuple from "../../components/Tuples/BonusTuple";
import RankTuple from "../../components/Tuples/RankTuple";
import TimeTuple from "../../components/Tuples/TimeTuple";
import ArrowButton from "../../components/Button/ArrowButton";

import {updateFeedback} from "../../utils/updateFeedback";
import {showMessage} from "react-native-flash-message";
import {makeSelectUserData} from "../../redux/selectors/userDataSelectors";
import {makeSelectScenarioData} from "../../redux/selectors/scenarioSelectors";
import {tokenInfo} from "../../utils/tokenInfo";
import {loadScenario} from "../../redux/actions/scenarioActions";
import {loadUserData} from "../../redux/actions/userDataActions";
import getUserGameData from "../../utils/getUserGameData";
import ChooseStatus from "../../utils/ChooseStatus";

class QuestFinalScreen extends Component{

    constructor(props){
        super(props);
        const defaultWeight = this._getCurrentRate();
        const voted = (defaultWeight !== - 1);
        const stars = (defaultWeight === - 1)? 0: defaultWeight;

        this.state = {
            loading: true,
            stars: stars,
            length: 0,
            comment: null,
            voted: voted,
            update: voted,
            was_updated: false,
            time: null,
            rank: null,
        };
        this._onPress = this._onPress.bind(this);
    }

    async componentWillMount(){
        await tokenInfo();
        const game_id = this.props.navigation.getParam('game_id', '');
        const game_passed_arr = this.props.userData.run.game_passed;
        const bonus = this.props.userData.run.bonus;
        let current_game = null;
        game_passed_arr.forEach((item) => {
                if (item.eid === game_id) {
                    current_game = item;
                }
            }
        );
        this.setState({rank: ChooseStatus(bonus)});
        this.setState({time: current_game.best_time});
    }
    async _onPress(){
        if (this.state.voted) {
            const gameId = this.props.navigation.getParam('game_id', '');
            if (this.state.was_updated)
                await updateFeedback(gameId, this.state.stars, this.state.comment, this.state.update);
            const data = await tokenInfo();
            this.props.loadUserData(data);
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
            (this.state.voted) ?
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
                        onChangeText={(text => this.setState({was_updated: true, comment: text, length: (text.length<250)? text.length : 250}))}
                        font={fonts.MURRAY}
                        color={colors.MAIN}
                    />
                    <Text style={{textAlign: 'right', fontFamily: fonts.MURRAY, color: colors.MAIN}}>{this.state.length}/{MAX_COMMENT_INPUT_LENGTH}</Text>
                </View> :
                <View/>
        )
    }

    _getCurrentRate(){
        const game_id = this.props.scenario[0].scenario.game_id;
        const game_passed_arr = this.props.userData.run.game_passed;
        let weight = -1;
        game_passed_arr.forEach((item) => {
                if (item.eid === game_id) {
                    // alert(item.rate[0].weight);
                    weight =  Number(item.rate[0].weight);
                }
            }
        );
        return weight;
    }

    render(){
        const theme = this.props.theme;
        const {width, height} = Dimensions.get('window');
        const gameData = this.props.userData.run;
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="position" enabled>
                <View style={{height: '100%', backgroundColor: colors.BASE[theme]}}>
                    <View style={{height: '18%', alignItems: 'center', paddingTop: 5}}>
                        <FinishTitleText color={colors.MAIN} font={fonts.MURRAY}>
                            <FormattedMessage message={'Finish'}/>
                        </FinishTitleText>
                    </View>
                    <Rectangle width={'100%'} height={1} backgroundColor={colors.MAIN}/>
                    <View style={{height: '20%', padding: 5}}>
                        <TimeTuple time={this.state.time}/>
                        <BonusTuple bonus={this.props.scenario[0].scenario.difficulty_bounty}/>
                        <RankTuple rank={this.state.rank}/>
                    </View>
                    <Rectangle width={'100%'} height={1} backgroundColor={colors.MAIN}/>
                    <View style={{flex: 1}}>
                        <View style={{alignItems: 'center', paddingTop: 5}}>
                            <FinishTitleText color={colors.MAIN} font={fonts.MURRAY}>
                                <FormattedMessage message={'Rate'}/>
                            </FinishTitleText>
                        </View>
                        <Stars
                            default={this.state.stars}
                            count={5}
                            spacing={20}
                            fullStar={<FontAwesome name="star" size={0.7/10.5*height} color={colors.MAIN}/>}
                            emptyStar={<FontAwesome name="star-o" size={0.7/10.5*height} color={colors.MAIN}/>}
                            update={(val)=>{this.setState({stars: val, voted: true, was_updated: true})}}
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
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
    userData: makeSelectUserData(),
    scenario: makeSelectScenarioData(),
});

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadUserData: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadUserData(evt))
        }
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose( withNavigation, withConnect)(QuestFinalScreen);
