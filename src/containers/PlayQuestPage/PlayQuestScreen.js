import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {withNavigation} from 'react-navigation';

import {AR_PAINT_QUESTION, LOCATION_QUESTION, TEXT_QUESTION, FREE_QUESTION} from "../Question/constants";
import TextQuestion from "../Question/TextQuestion";
import LocationQuestion from "../Question/LocationQuestion";
import ARQuestion from "../Question/ARQuestion";
import FreeQuestion from '../Question/FreeQuestion';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {makeSelectGameStep} from "../../components/GameStep/selectors";
import {mapDispatchToProps} from "../BonusPage/BonusScreen";
import PropTypes from "prop-types";
import {updateCurrentStep} from "../../components/GameStep/actions";

class PlayQuestScreen extends Component{
    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    componentDidMount(){
        const navigation = this.props.navigation;
        const scenario = navigation.getParam('scenario', '');
        const userData = navigation.getParam('userData', '');

        const gameId = scenario[0].scenario.game_id;
        let step = 0;
        if (userData && userData.gameData){
            for(const it in userData.gameData.games_process){
                if (it.game.id === gameId) {
                    step = it.game.step_passed;
                    break;
                }
            }
            this.context.store.dispatch(updateCurrentStep(step));
        }
    }

    render() {
        const navigation = this.props.navigation;
        const scenario = navigation.getParam('scenario', '');
        const currentStep = this.props.currentStep;

        const step = scenario[0].scenario.steps[currentStep];
        switch (step.type) {
            case TEXT_QUESTION:
               return <TextQuestion data={step.desc} stepsAmount={2}/>;
            case LOCATION_QUESTION:
               return <LocationQuestion data={step.desc} stepsAmount={2}/>;
            case AR_PAINT_QUESTION:
               return <ARQuestion data={step.desc} scenarioID={scenario[0].scenario.scenario_id} stepID={currentStep} stepsAmount={2}/>;
            case FREE_QUESTION:
               return <FreeQuestion data={step.desc} stepsAmount={2}/>;
            default:
               return <View/>;
       }
   }
}
const mapStateToProps = createStructuredSelector({
    currentStep: makeSelectGameStep(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withNavigation,
    withConnect,
)(PlayQuestScreen);
