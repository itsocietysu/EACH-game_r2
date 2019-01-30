import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStep = state => state.get('gameStep', initialState);

const makeSelectGameStep = () =>
    createSelector(selectStep, stepState => stepState.get('currentStep'));

export { makeSelectGameStep };
