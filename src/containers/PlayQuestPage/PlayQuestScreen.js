import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {withNavigation} from 'react-navigation';

import {AR_PAINT_QUESTION, LOCATION_QUESTION, TEXT_QUESTION} from "../Question/constants";
import TextQuestion from "../Question/TextQuestion";
import LocationQuestion from "../Question/LocationQuestion";
import ARQuestion from "../Question/ARQuestion";


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
           currStep = 4;
       // TODO: current step should be loaded the from global state

       const step = scenario[0].scenario.steps[currStep];
       switch (step.type) {
           case TEXT_QUESTION:
               return <TextQuestion data={step.desc}/>;
           case LOCATION_QUESTION:
               return <LocationQuestion data={step.desc}/>;
           case AR_PAINT_QUESTION:
               return <ARQuestion data={step.desc} scenarioID={scenario[0].scenario.scenario_id} stepID={currStep}/>;
           default:
               return <View/>;
       }
   }
}

export default (withNavigation)(PlayQuestScreen);
