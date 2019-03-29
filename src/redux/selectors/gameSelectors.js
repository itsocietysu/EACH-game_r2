/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/gameReducer';

const selectGames = state => state.get('games', initialState);

const makeSelectGameLoading = () =>
    createSelector(selectGames, gamesState => gamesState.get('loading'));

const makeSelectGameError = () =>
    createSelector(selectGames, gamesState => gamesState.get('error'));

const makeSelectGameData = () =>
    createSelector(selectGames, gamesState => gamesState.get('data'));

export { selectGames, makeSelectGameLoading, makeSelectGameError, makeSelectGameData };
