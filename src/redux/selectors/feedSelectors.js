/**
 * HomePage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from '../reducers/feedReducer';

const selectFeeds = state => state.get('feeds', initialState);

const makeSelectFeedLoading = () =>
    createSelector(selectFeeds, feedsState => feedsState.get('loading'));

const makeSelectFeedError = () =>
    createSelector(selectFeeds, feedsState => feedsState.get('error'));

const makeSelectFeedData = () =>
    createSelector(selectFeeds, feedsState => feedsState.get('data'));

export { selectFeeds, makeSelectFeedLoading, makeSelectFeedError, makeSelectFeedData };