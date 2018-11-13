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

import { LOAD_GAMES, LOAD_GAMES_SUCCESS, LOAD_GAMES_ERROR } from './constants';

/**
 * Load feeds data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_FEEDS
 */
export function loadGames(museumID) {
    return {
        type: LOAD_GAMES,
        museumID,
    };
}

/**
 * Dispatched when games data is loaded by the request saga
 *
 * @param  {array} games The current feeds
 *
 * @return {object} An action object with a type of LOAD_GAMES_SUCCESS passing feeds data
 */
export function gamesLoaded(games) {
    return {
        type: LOAD_GAMES_SUCCESS,
        games,
    };
}

/**
 * Dispatched when loading feeds data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_FEEDS_ERROR passing the error
 */
export function gamesLoadingError(error) {
    return {
        type: LOAD_GAMES_ERROR,
        error,
    };
}
