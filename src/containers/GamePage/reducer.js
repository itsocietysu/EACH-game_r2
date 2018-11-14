/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
    LOAD_GAMES,
    LOAD_GAMES_SUCCESS,
    LOAD_GAMES_ERROR
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: false,
});

function gamesReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_GAMES:
            return state
                .set('loading', true)
                .set('error', false)
                .set('data', false);
        case LOAD_GAMES_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.games);
        case LOAD_GAMES_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('data', false);
        default:
            return state;
    }
}

export default gamesReducer;
