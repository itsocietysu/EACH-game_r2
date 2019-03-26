/**
 * Image comparison result selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/imageValidationReducer';

const selectResult = state => state.get('result', initialState);

const makeSelectResult = () =>
    createSelector(selectResult, resultState => resultState.get('result'));

const makeSelectLoading = () =>
    createSelector(selectResult, resultState => resultState.get('loading'));

const makeSelectError = () =>
    createSelector(selectResult, resultState => resultState.get('error'));

export { selectResult, makeSelectResult, makeSelectLoading, makeSelectError };
