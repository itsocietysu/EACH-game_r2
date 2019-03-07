/**
 * Locales selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/themeReducer';

const selectTheme = state => state.get('theme', initialState);

const makeSelectTheme = () =>
    createSelector(selectTheme, themeState => themeState.get('theme'));


export { makeSelectTheme };
