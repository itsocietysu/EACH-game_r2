/**
 * Image comparison result selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectResult = state => state.get('locales', initialState);

const makeSelectResult = () =>
    createSelector(selectResult, resultState => resultState.get('result'));


export { makeSelectResult };
