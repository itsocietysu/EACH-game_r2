import { createSelector } from 'reselect';
import { initialState } from '../reducers/userDataReducer';

const selectUserData = state => state.get('userData', initialState);

const makeSelectUserData = () =>
    createSelector(selectUserData, userDataState => userDataState.get('data'));

export { selectUserData, makeSelectUserData };