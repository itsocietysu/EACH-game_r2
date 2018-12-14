import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions, ActivityIndicator,
    ScrollView
} from 'react-native';
import {withNavigation} from 'react-navigation'
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import PropTypes from "prop-types";


import {makeSelectLanguage} from "../../components/Locales/selectors";
import messages from "../../Messages"


import styled from "styled-components/native";

import {loadScenario} from "../../components/ScenarioPage/actions";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../../components/ScenarioPage/selectors";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../components/ScenarioPage/reducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../../components/ScenarioPage/saga";
import {MainTextContainer, MainText, TextContainer, TittleText, StyledButton, SpamHello} from "../styles";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {colors, fonts} from "../../utils/constants";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import getFont from "../../utils/getFont";

import Rating from './Rating';
import SpentTime from './SpentTime';
import ArrowButton from "../../components/ArrowButton";
import Button from "../../components/Button";

const QuestTittle = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 38
    paddingTop: 10
    paddingBottom: 5
`;

const StatisticsContainer = styled.View`
    flexDirection: row
    paddingTop: 10
    paddingLeft: 15
    paddingRight: 15
    paddingBottom: 8
`;

const DescriptionText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 16
`;

const DescriptionContainer = styled.View`
    paddingLeft: 10
`;

const ButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
`;

class QuestInfoScreen extends  Component {

    componentDidMount(){
        this.props.init();
    }

    render(){
        const {width, height} = Dimensions.get('window');
        const navigation = this.props.navigation;
        const quest = navigation.getParam('quest', '');
        const theme = this.props.theme;
        const locale = this.props.language.toUpperCase();
        const fontLoaded = this.props.font;

        // loading scenario
        const loading = this.props.loading;
        const error = this.props.error;
        const scenario = this.props.data;


        if (loading) {
            return <View><ActivityIndicator/></View>;
        }

        if (error !== false) {
            console.error(error);
            return <Text>Something went wrong</Text>;
        }

        if (scenario !== false) {
            return (
                <FormattedWrapper locale={this.props.language} messages={messages}>
                    <View style={{flex: 1,  backgroundColor: colors.BASE[theme]}}>
                        <QuestTittle color={colors.MAIN}
                                     font={getFont(fontLoaded, fonts.EACH)}
                        >
                            {quest.name[locale]}
                        </QuestTittle>
                        <Image source={{uri: quest.image}} style={{resizeMode: 'cover', width: width, height: width*0.75}}/>
                        <StatisticsContainer>
                            <Rating/>
                            <SpentTime/>
                        </StatisticsContainer>
                        <ScrollView style={{flex: 1}}>
                            <DescriptionContainer>
                                <DescriptionText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.MURRAY)}
                                >
                                    {quest.desc[locale]}
                                </DescriptionText>
                            </DescriptionContainer>
                        </ScrollView>
                        <View style={{paddingTop: 15, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <ArrowButton
                                onPress={()=>this.props.navigation.navigate('QuestPlay', {scenario})}
                                bgColor={colors.BASE[theme]}
                                borderColor={colors.MAIN}
                                width={width*0.55}
                                height={height*0.075}
                            >
                                <ButtonText color={colors.TEXT[theme]} font={getFont(fontLoaded, fonts.EACH)}><FormattedMessage message={'Play'}/>-></ButtonText>
                            </ArrowButton>
                        </View>
                    </View>
                </FormattedWrapper>
            );
        }
        return <View/>;
    }
}
QuestInfoScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    language: PropTypes.string,
    theme: PropTypes.string,
    init: PropTypes.func,
};

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        init: evt => {
            const quest = ownProps.navigation.getParam('quest', '');
            const scenarioID = quest.scenario[0].eid;
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadScenario(scenarioID));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'scenario', reducer });
const withSaga = injectSaga({ key: 'scenario', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
    withNavigation,
)(QuestInfoScreen);
