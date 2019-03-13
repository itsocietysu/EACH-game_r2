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


import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import messages from "../../Messages"


import styled from "styled-components/native";

import {loadScenario} from "../../redux/actions/scenarioActions";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../../redux/selectors/scenarioSelectors";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../redux/reducers/scenarioReducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../../redux/sagas/scenarioSaga";
import {QuestButtonText, FeedPlainText, QuestTittle, Rectangle} from "../styles";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {colors, fonts} from "../../utils/constants";

import Rating from '../../components/Tuples/RatingTuple';
import SpentTime from '../../components/Tuples/SpentTimeTuple';
import ArrowButton from "../../components/Button/ArrowButton";
import { tokenInfo} from './../../utils/tokenInfo';
import getUserGameData from "../../utils/getUserGameData";
import {makeSelectAuth} from "../../redux/selectors/authSelectors";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const StatisticsContainer = styled.View`
    flexDirection: row
    paddingTop: 10
    paddingLeft: 15
    paddingRight: 15
    paddingBottom: 8
`;

const DescriptionContainer = styled.View`
    paddingLeft: 10
    paddingRight: 10
`;

class QuestInfoScreen extends  Component {

    state = {
        userData: null,
    };

    async componentDidMount(){
        this.props.init();
        await tokenInfo();
        await getUserGameData().then(data => this.setState({userData: data}));
    }

    render(){
        const {width, height} = Dimensions.get('window');
        const navigation = this.props.navigation;
        const quest = navigation.getParam('quest', '');
        const theme = this.props.theme;
        const locale = this.props.language.toUpperCase();

        // loading scenario
        const loading = this.props.loading;
        const error = this.props.error;
        const scenario = this.props.data;

        let button;
        if (this.props.auth){
            button =
                <ArrowButton
                    onPress={()=>this.props.navigation.navigate('QuestPlay', {scenario, userData: this.state.userData})}
                    bgColor={colors.BASE[theme]}
                    borderColor={colors.MAIN}
                    width={width*0.55}
                    height={height*0.075}
                >
                    <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                        <FormattedMessage message={'Play'}/>->
                    </QuestButtonText>
                </ArrowButton>;
        }
        else
            button =
                <ArrowButton
                    onPress={()=>this.props.navigation.navigate('Login')}
                    bgColor={colors.BASE[theme]}
                    borderColor={colors.MAIN}
                    width={width*0.55}
                    height={height*0.075}
                >
                    <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}>
                        <FormattedMessage message={'Auth'}/>->
                    </QuestButtonText>
                </ArrowButton>;

        if (loading || !this.state.userData) {
            return <View><ActivityIndicator/></View>;
        }

        if (error !== false) {
            return <ErrorMessage/>
        }

        if (scenario !== false) {
            return (
                <FormattedWrapper locale={this.props.language} messages={messages}>
                    <View style={{flex: 1,  backgroundColor: colors.BASE[theme]}}>
                        <ScrollView style={{flex: 1}}>
                            <QuestTittle color={colors.MAIN}
                                         font={fonts.EACH}
                            >
                                {quest.name[locale]}
                            </QuestTittle>
                            <Image source={{uri: quest.image}} style={{resizeMode: 'cover', width: width, height: width*0.75}}/>
                            <StatisticsContainer>
                                <Rating/>
                                <SpentTime/>
                            </StatisticsContainer>

                                <DescriptionContainer>
                                    <FeedPlainText color={colors.TEXT[theme]} font={fonts.MURRAY}
                                    >
                                        {quest.desc[locale]}
                                    </FeedPlainText>
                                </DescriptionContainer>
                        </ScrollView>
                        <Rectangle width={width} height={1} backgroundColor={colors.MAIN}/>
                        <View style={{paddingTop: 15, paddingBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                            {button}
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
    auth: makeSelectAuth(),
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
