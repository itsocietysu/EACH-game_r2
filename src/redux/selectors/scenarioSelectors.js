/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/scenarioReducer';

const selectScenario = state => state.get('scenario', initialState);

const makeSelectScenarioLoading = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('loading'));

const makeSelectScenarioError = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('error'));

const makeSelectScenarioData = () =>
    createSelector(selectScenario, scenarioState => scenarioState.get('data'));

export { selectScenario, makeSelectScenarioLoading, makeSelectScenarioError, makeSelectScenarioData };
