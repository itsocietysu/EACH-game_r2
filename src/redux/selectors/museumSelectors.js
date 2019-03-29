/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/museumReducer';

const selectMuseums = state => state.get('museums', initialState);

const makeSelectMuseumLoading = () =>
    createSelector(selectMuseums, museumsState => museumsState.get('loading'));

const makeSelectMuseumError = () =>
    createSelector(selectMuseums, museumsState => museumsState.get('error'));

const makeSelectMuseumData = () =>
    createSelector(selectMuseums, museumsState => museumsState.get('data'));

export { selectMuseums, makeSelectMuseumLoading, makeSelectMuseumError, makeSelectMuseumData };
