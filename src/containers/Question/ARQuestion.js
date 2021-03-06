import React, {Component} from 'react';
import {
    View,
    WebView,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ActivityIndicator, Image
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectError, makeSelectLoading, makeSelectResult} from "../../redux/selectors/imageValidationSelectors";
import {imageCompare} from "../../redux/actions/imageValidationActions";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../redux/reducers/imageValidationReducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../../redux/sagas/imageValidationSaga";

import {QuestButtonText} from "../styles";
import messages from "../../Messages";
import {colors, fonts} from "../../utils/constants";

import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import styled from "styled-components/native";
import ArrowButton from "../../components/Button/ArrowButton";
import showDialog from "../../components/PopUpDialog/CustomPopUpDialog";
import HintIcon from "../../components/Icons/HintIcon";

const QuestionText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20px
    paddingLeft: 10
    paddingTop: 10
`;

const DescText = styled.Text`
    textAlign: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
    paddingTop: 20
`;

const ButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: 20
`;

class ARQuestion extends Component{


    constructor(){
        super();
        this.state={
            selectedImage: null,
            loading: false,
        };
        this.handler = this.handler.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.result !== -1){
            console.log(nextProps.result[0].result);
            // this.setState({loading: false});
            this._validateResult(nextProps.result[0].result);
        }
    }

    _validateResult(result){
        this.props.processResult(result);
    }

    handler(image){
        const body = {
            id: this.props.scenarioID,
            stepid: this.props.stepID,
            image: image.base64,
        };
        this.setState({selectedImage: image, loading: true}, ()=>this.props.checkImage(body));
    }

    render(){
        const step = this.props.data;
        const theme = this.props.theme;
        const ratio = step.target.ratio;
        const {width, height} = Dimensions.get('window');

        let loadingInfo =<View/>;
        let imageTest = loadingInfo;

        if (this.props.loading) {
            loadingInfo =
                <View style={{position: 'absolute', left: 65, top: 200}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.SECOND.light}}>Processing. Please wait...</Text>
                    <ActivityIndicator size={'large'} color={colors.SECOND.light}/>
                </View>;
        }
        /* if (this.state.selectedImage !== null) {
            imageTest = <WebView source={{uri: this.state.selectedImage.uri}} style={{width: width, height: width}}/>;
        }*/

        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1,  backgroundColor: colors.BASE[theme]}}>
                    {loadingInfo}
                    {showDialog(this,<FormattedMessage message={'Hint'}/>, step.hint)}
                        <View style={{flexDirection: 'row', paddingTop: 5, paddingLeft:5, paddingRight: 5}}>
                            <Image source={{uri: step.avatar.uri}}
                                   style={{width: width*0.45, height: width*0.45}}/>
                            <View style={{flex: 1, paddingLeft: 5}}>
                                <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'ARTaskDesc'}/>
                                </DescText>
                            </View>

                        </View>
                        <QuestionText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                            {step.question}
                        </QuestionText>
                        <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 5, paddingBottom: 15}}>
                            <View style={{justifyContent: 'center', padding: 5}}>
                                <DescText color={colors.MAIN} font={fonts.MURRAY}>
                                    <FormattedMessage message={'ARTaskAdd'}/>
                                </DescText>
                            </View>
                            {/* <View style={{alignItems: 'center'}}>
                                <ArrowButton
                                    onPress={() => this.props.navigation.navigate('Camera', {
                                        handler: this.handler,
                                        aspectRatio: ratio})
                                    }
                                    bgColor={colors.BASE[theme]}
                                    borderColor={colors.MAIN}
                                    width={width*0.55}
                                    height={height*0.075}
                                >
                                    <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}><FormattedMessage message={'Photo'}/>-></QuestButtonText>
                                </ArrowButton>
                            </View>*/}
                            <View style={{flex: 1, justifyContent: 'flex-end', paddingTop: 15, paddingBottom: 15, alignItems: 'center'}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <ArrowButton
                                        onPress={() => this.props.navigation.navigate('Camera', {
                                            handler: this.handler,
                                            aspectRatio: ratio})
                                        }
                                        bgColor={colors.BASE[theme]}
                                        borderColor={colors.MAIN}
                                        width={width*0.55}
                                        height={height*0.075}
                                    >
                                        <QuestButtonText color={colors.TEXT[theme]} font={fonts.EACH}><FormattedMessage message={'Photo'}/>-></QuestButtonText>
                                    </ArrowButton>
                                    <HintIcon onPress={()=>this.refDialog.show()}/>
                                </View>
                            </View>
                        </View>

                    {/* imageTest*/}
                </View>
            </FormattedWrapper>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        checkImage: (evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(imageCompare(evt));
        },

    }
}

const mapStateToProps = createStructuredSelector({
    result: makeSelectResult(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    theme: makeSelectTheme(),
    locale: makeSelectLanguage(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'result', reducer });
const withSaga = injectSaga({ key: 'result', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withNavigation,
)(ARQuestion);
