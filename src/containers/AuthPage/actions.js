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

import { LOAD_AUTH_INFO, LOAD_AUTH_INFO_SUCCESS, LOAD_AUTH_INFO_ERROR } from './constants';

/**
 * Load auth data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_FEEDS
 */
export function loadAuthInfo(userID) {
  return {
    type: LOAD_AUTH_INFO,
    userID,
  };
}

/**
 * Dispatched when auth data is loaded by the request saga
 *
 * @param  {array} auth info The current user
 *
 * @return {object} An action object with a type of LOAD_AUTH_INFO_SUCCESS passing auth data
 */
export function authInfoLoaded(auth) {
  return {
    type: LOAD_AUTH_INFO_SUCCESS,
    auth,
  };
}

/**
 * Dispatched when loading auth data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_AUTH_INFO_ERROR passing the error
 */
export function authInfoLoadingError(error) {
  return {
    type: LOAD_AUTH_INFO_ERROR,
    error,
  };
}
