/**
 * Locales selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/authReducer';

const selectAuth = state => state.get('auth', initialState);

const makeSelectAuth = () =>
  createSelector(selectAuth, authState => authState.get('auth'));


export { makeSelectAuth };
