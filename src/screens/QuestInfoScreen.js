import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions, ActivityIndicator
} from 'react-native';
import {withNavigation} from 'react-navigation'
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import PropTypes from "prop-types";


import {makeSelectLanguage} from "../containers/Locales/selectors";
import messages from "../Messages"




import {loadScenario} from "../containers/ScenarioPage/actions";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../containers/ScenarioPage/selectors";
import injectReducer from "../utils/injectReducer";
import reducer from "../containers/ScenarioPage/reducer";
import injectSaga from "../utils/injectSaga";
import saga from "../containers/ScenarioPage/saga";


class QuestInfoScreen extends  Component {

    componentDidMount(){
        this.props.init();
    }

    render(){
        const width = Dimensions.get('window').width;
        const navigation = this.props.navigation;
        const quest = navigation.getParam('quest', '');

        const locale = this.props.language.toUpperCase();

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
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>{quest.name[locale]}</Text>
                        <Image source={{uri: quest.image}} style={{width: width, height: width}}/>
                        <Text>{quest.desc[locale]}</Text>
                        <Text>{quest.scenario[0].eid}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestPlay', {scenario})}>
                            <Text style={{color: '#0000ff'}}><FormattedMessage message={'Play'}/></Text>
                        </TouchableOpacity>
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
