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



import {makeSelectLanguage} from "../containers/Locales/selectors";
import {AR_PAINT_QUESTION, LOCATION_QUESTION, TEXT_QUESTION} from "../containers/Question/constants";
import TextQuestion from "../containers/Question/TextQuestion";
import LocationQuestion from "../containers/Question/LocationQuestion";
import ARQuestion from "../containers/Question/ARQuestion";

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


       // TODO: remove next string
       let currStep = 0;
       const next = navigation.getParam('next', '');
       if (next === 'next')
           currStep = 1;
       else
           currStep = 0;
       // TODO: current step should be loaded the from global state

       const step = scenario[0].scenario.steps[currStep];
       switch (step.type) {
           case TEXT_QUESTION:
               return <TextQuestion data={step.desc}/>;
           case LOCATION_QUESTION:
               return <LocationQuestion data={step.desc}/>;
           case AR_PAINT_QUESTION:
               return <ARQuestion data={step.desc}/>;
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
    museumID: PropTypes.number,
    init: PropTypes.func,
};

export function mapDispatchToProps(dispatch, ownProps) {
    return {
    }
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
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
