/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectScenario = state => state.get('scenario', initialState);

const makeSelectLoading = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('loading'));

const makeSelectError = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('error'));

const makeSelectData = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('data'));

export { selectScenario, makeSelectLoading, makeSelectError, makeSelectData };