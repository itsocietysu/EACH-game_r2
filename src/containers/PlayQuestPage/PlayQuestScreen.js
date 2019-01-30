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
import {updateStatistics} from "../../utils/updateStatistics";

class PlayQuestScreen extends Component{
    static contextTypes = {
        store: PropTypes.object.isRequired,
    };

    constructor(){
        super();
        this._processResult = this._processResult.bind(this);
    }

    async componentDidMount(){
        const navigation = this.props.navigation;
        const scenario = navigation.getParam('scenario', '');
        const userData = navigation.getParam('userData', '');
        const gameId = scenario[0].scenario.game_id;
        let step = -1;
        if (userData && userData.gameData && userData.gameData.game_process){
            for(let item of userData.gameData.game_process){
                if(item.eid === gameId) {
                    step = Number.parseInt(item.step_passed, 10);
                    break;
                }
            }
        }
        if (step === -1 || step ===  scenario[0].scenario.step_count){
            let success = await updateStatistics(gameId, 0);
            step = 0;
        }

        alert(step);
        this.context.store.dispatch(updateCurrentStep(step));
    }

    _processResult(result){
        const currentStep = this.props.currentStep;
        const scenario = this.props.navigation.getParam('scenario', '');
        const step = scenario[0].scenario.steps[currentStep];

        const stepsAmount = scenario[0].scenario.step_count;
        const bonus = step.desc.bonus;
        const gameID = scenario[0].scenario.game_id;
        this.props.navigation.navigate('Result', {result, bonus, stepsAmount, gameID});
    }

    render() {
        const navigation = this.props.navigation;
        const scenario = navigation.getParam('scenario', '');
        const currentStep = this.props.currentStep;

        const step = scenario[0].scenario.steps[currentStep];
        const scenarioID = scenario[0].scenario.scenario_id;
        switch (step.type) {
            case TEXT_QUESTION:
               return <TextQuestion key={currentStep} data={step.desc} processResult={this._processResult}/>;
            case LOCATION_QUESTION:
               return <LocationQuestion key={currentStep} data={step.desc} processResult={this._processResult}/>;
            case AR_PAINT_QUESTION:
               return <ARQuestion key={currentStep} data={step.desc} processResult={this._processResult} scenarioID={scenarioID} stepID={currentStep}/>;
            case FREE_QUESTION:
               return <FreeQuestion key={currentStep} data={step.desc} processResult={this._processResult}/>;
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
