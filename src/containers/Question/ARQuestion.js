import React, {Component} from 'react';
import {
    View,
    WebView,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectResult} from "../../components/ValidateImage/selectors";
import {imageCompare} from "../../components/ValidateImage/actions";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../components/ValidateImage/reducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../../components/ValidateImage/saga";

import {ButtonText, StyledButton,  TittleText} from "../styles";
import messages from "../../Messages";
import {colors} from "../../utils/constants";

class ARQuestion extends Component{

    constructor(){
        super();
        this.state={
            selectedImage: null,
            loading: false,
        };
        this.handler = this.handler.bind(this);
    }

    // TODO: debug version => release version
    _validateResult(res){
        const bonus = this.props.data.bonus;
        let result = 'fail';
        if (res) {
            result = 'success';
        }
        this.props.navigation.navigate('Result', {result, bonus});
    }

    handler(image){
        const body = {
            id: this.props.scenarioID,
            stepid: this.props.stepID,
            image: image.base64,
        };
        // this.props.checkImage(body);

        this.setState({selectedImage: image, loading: true}, ()=>this.props.checkImage(body));
    }

    render(){
        const data = this.props.data;
        const theme = this.props.theme;
        const ratio = data.target.ratio;
        const {width, height} = Dimensions.get('window');

        let loadingInfo =<View/>;
        let imageTest = loadingInfo;

        if (this.state.loading) {
            loadingInfo =
                <View style={{position: 'absolute', left: 65, top: 200}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.SECOND.light}}>Processing. Please wait...</Text>
                    <ActivityIndicator size={'large'} color={colors.SECOND.light}/>
                </View>;
        }
        if (this.state.selectedImage !== null) {
            imageTest = <WebView source={{uri: this.state.selectedImage.uri}} style={{width: width, height: width}}/>;
        }

        return(
            <FormattedWrapper locale={this.props.language} messages={messages}>
                <View style={{flex: 1,  backgroundColor: colors.BASE[theme]}}>
                    {loadingInfo}
                    <ScrollView style={{flex: 1}}>
                        <TittleText color={colors.TEXT[theme]}>{data.question}</TittleText>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Camera', {
                                                handler: this.handler,
                                                aspectRatio: ratio})
                            }
                        >
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <StyledButton color={colors.SECOND[theme]}>
                                    <ButtonText color={colors.BUTTON_TEXT[theme]}><FormattedMessage message={'TakePicture'}/></ButtonText>
                                </StyledButton>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    {imageTest}
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
