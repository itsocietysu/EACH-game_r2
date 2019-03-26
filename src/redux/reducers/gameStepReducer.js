import { fromJS } from 'immutable';
import {STEP_INC, STEP_RELEASE} from "../constants/gameStepConstants";

export const initialState = fromJS({
    currentStep: 0,
});

function stepReducer(state = initialState, action){
    switch (action.type) {
        case STEP_INC:
            return state
                .set('currentStep', action.step);
        case STEP_RELEASE:
            return initialState;
        default:
            return state;
    }
}
export default stepReducer;