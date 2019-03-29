/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// import globalReducer from 'containers/App/reducer';
import languageReducer from './redux/reducers/localesReducer';
import feedsReducer from './redux/reducers/feedReducer';
import museumsReducer from './redux/reducers/museumReducer';
import gamesReducer from "./redux/reducers/gameReducer";
import scenarioReducer from "./redux/reducers/scenarioReducer";
import themeReducer from "./redux/reducers/themeReducer";
import imageComparisonReducer from "./redux/reducers/imageValidationReducer";
import stepReducer from "./redux/reducers/gameStepReducer";
import authReducer from "./redux/reducers/authReducer";
import userDataReducer from "./redux/reducers/userDataReducer";
/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const routeInitialState = fromJS({
    location: null,
});

/**
 * Merge route into the global application state
 */
export function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        // global: globalReducer,
        locales: languageReducer,
        theme: themeReducer,
        feeds: feedsReducer,
        museums: museumsReducer,
        games: gamesReducer,
        scenario: scenarioReducer,
        result: imageComparisonReducer,
        gameStep: stepReducer,
        auth: authReducer,
        userData: userDataReducer,
        ...injectedReducers,
    });
}
