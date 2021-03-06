/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
    LOAD_MUSEUMS,
    LOAD_MUSEUMS_SUCCESS,
    LOAD_MUSEUMS_ERROR,
} from '../constants/museumConstants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: false,
});

function museumsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MUSEUMS:
            return state
                .set('loading', true)
                .set('error', false)
                .set('data', false);
        case LOAD_MUSEUMS_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.museums);
        case LOAD_MUSEUMS_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('data', false);
        default:
            return state;
    }
}

export default museumsReducer;
