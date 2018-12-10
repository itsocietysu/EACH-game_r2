
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFont = state => state.get('font', initialState);

const makeSelectFonts = () =>
    createSelector(selectFont, fontState => fontState.get('fontLoaded'));

export { makeSelectFonts };
