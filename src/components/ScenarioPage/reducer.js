/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
    LOAD_SCENARIO,
    LOAD_SCENARIO_SUCCESS,
    LOAD_SCENARIO_ERROR
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: false,
});

function scenarioReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SCENARIO:
            return state
                .set('loading', true)
                .set('error', false)
                .set('data', false);
        case LOAD_SCENARIO_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.scenario);
        case LOAD_SCENARIO_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('data', false);
        default:
            return state;
    }
}

export default scenarioReducer;
