/*
 * HomePage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_SCENARIO, LOAD_SCENARIO_SUCCESS, LOAD_SCENARIO_ERROR } from '../constants/scenarioConstants';

/**
 * Load feeds data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_FEEDS
 */
export function loadScenario(scenarioID) {
    return {
        type: LOAD_SCENARIO,
        scenarioID,
    };
}

/**
 * Dispatched when games data is loaded by the request saga
 *
 * @param  {array} scenario The current feeds
 *
 * @return {object} An action object with a type of LOAD_GAMES_SUCCESS passing feeds data
 */
export function scenarioLoaded(scenario) {
    return {
        type: LOAD_SCENARIO_SUCCESS,
        scenario,
    };
}

/**
 * Dispatched when loading feeds data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_FEEDS_ERROR passing the error
 */
export function scenarioLoadingError(error) {
    return {
        type: LOAD_SCENARIO_ERROR,
        error,
    };
}

