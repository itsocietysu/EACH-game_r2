/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/gameReducer';

const selectGames = state => state.get('games', initialState);

const makeSelectLoading = () =>
    createSelector(selectGames, gamesState => gamesState.get('loading'));

const makeSelectError = () =>
    createSelector(selectGames, gamesState => gamesState.get('error'));

const makeSelectData = () =>
    createSelector(selectGames, gamesState => gamesState.get('data'));

export { selectGames, makeSelectLoading, makeSelectError, makeSelectData };
