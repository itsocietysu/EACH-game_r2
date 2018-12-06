import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import {withNavigation} from 'react-navigation';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";



import {makeSelectLanguage} from "../../components/Locales/selectors";
import {AR_PAINT_QUESTION, LOCATION_QUESTION, TEXT_QUESTION} from "../Question/constants";
import TextQuestion from "../Question/TextQuestion";
import LocationQuestion from "../Question/LocationQuestion";
import ARQuestion from "../Question/ARQuestion";
import {makeSelectTheme} from "../../components/Theme/selectors";

class PlayQuestScreen extends Component{
    state = {
        currentStep: 1,
    };

    // TODO: remove method
    shouldComponentUpdate(){
        const navigation = this.props.navigation;
        const k = navigation.getParam('next', '');
        const l = 'next';
        if(l === 'next')
            return true;
        return false;
    }

   render() {
       const navigation = this.props.navigation;
       const scenario = navigation.getParam('scenario', '');
       const theme = this.props.theme;

       // TODO: remove next string
       let currStep = 0;
       const next = navigation.getParam('next', '');
       if (next === 'next')
           currStep = 1;
       else
           currStep = 3;
       // TODO: current step should be loaded the from global state

       const step = scenario[0].scenario.steps[currStep];
       switch (step.type) {
           case TEXT_QUESTION:
               return <TextQuestion data={step.desc} theme={theme}/>;
           case LOCATION_QUESTION:
               return <LocationQuestion data={step.desc} theme={theme}/>;
           case AR_PAINT_QUESTION:
               return <ARQuestion data={step.desc} theme={theme} scenarioID={scenario[0].scenario.scenario_id} stepID={currStep}/>;
           default:
               return <View/>;
       }
   }
}

PlayQuestScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    language: PropTypes.string,
    theme: PropTypes.string,
    museumID: PropTypes.number,
    init: PropTypes.func,
};

export function mapDispatchToProps(dispatch, ownProps) {
    return {
    }
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    // withRequest,
    withConnect,
    withNavigation,
)(PlayQuestScreen);
