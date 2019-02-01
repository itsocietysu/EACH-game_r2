/**
 * Locales selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.get('auth', initialState);

const makeSelectAuth = () =>
  createSelector(selectAuth, authState => authState.get('auth'));


export { makeSelectAuth };
