/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
    LOAD_FEEDS,
    LOAD_FEEDS_SUCCESS,
    LOAD_FEEDS_ERROR
} from '../constants/feedConstants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: false,
});

function feedsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_FEEDS:
            return state
                .set('loading', true)
                .set('error', false)
                .set('data', false);
        case LOAD_FEEDS_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.feeds);
        case LOAD_FEEDS_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('data', false);
        default:
            return state;
    }
}

export default feedsReducer;