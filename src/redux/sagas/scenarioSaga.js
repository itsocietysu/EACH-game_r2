import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_SCENARIO } from '../constants/scenarioConstants';
import { scenarioLoaded, scenarioLoadingError } from '../actions/scenarioActions';
import request from '../../utils/request';
import {backend_api_url} from "../../utils/constants";

/**
 * Feeds data load handler
 */
export function* loadScenario(scenarioID) {
    const requestURL = `${backend_api_url}/each/scenario/user/${scenarioID.scenarioID}`;
    try {
        const scenario = yield call(request, requestURL);
        let data = false;
        if (scenario.length) {
            data = scenario.map(item => ({
                scenario: JSON.parse(item.json),
            }));
        }
        yield put(scenarioLoaded(data));
    } catch (err) {
        yield put(scenarioLoadingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadScenarioData() {
    yield takeLatest(LOAD_SCENARIO, loadScenario);
}
