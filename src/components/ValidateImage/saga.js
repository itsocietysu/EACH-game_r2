import { call, put, takeLatest } from 'redux-saga/effects';
import { IMAGE_COMPARE } from './constants';
import { imageCompareFinished, imageComparisonError } from './actions';
import request from '../../utils/request';

/**
 * Image compare handler
 */
export function* imageCompare(body) {
    const requestURL = `http://each.itsociety.su:4201/each/scenario/check_image`;
    try {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body.body),
        };
        const result = yield call(request, requestURL, options);
        yield put(imageCompareFinished(result));
    } catch (err) {
        yield put(imageComparisonError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* imageCompareData() {
    yield takeLatest(IMAGE_COMPARE, imageCompare);
}
