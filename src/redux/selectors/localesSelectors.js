/**
 * Locales selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/localesReducer';

const selectLocales = state => state.get('locales', initialState);

const makeSelectLanguage = () =>
    createSelector(selectLocales, localesState => localesState.get('language'));


export { makeSelectLanguage };
