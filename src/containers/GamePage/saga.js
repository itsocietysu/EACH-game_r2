import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_GAMES } from './constants';
import { gamesLoaded, gamesLoadingError } from './actions';
import request from './../../utils/request';

/**
 * Feeds data load handler
 */
export function* loadGames(museumID) {
    const requestURL = `http://each.itsociety.su:4201/each/game/all/museum/${museumID.museumID}?active=true`;
    try {
        const games = yield call(request, requestURL);
        let data = false;
        if (games.length) {
            data = games.map(item => ({
                eid: item.eid,
                ownerid: item.ownerid,
                name: item.name,
                desc: item.desc,
                image: `${
                    item.image[0] ? `http://${item.image[0].url}` : 'assets/images/DefaultPhoto.png'
                    }`,
                scenario: item.scenario,
            }));
        }
        yield put(gamesLoaded(data));
    } catch (err) {
        yield put(gamesLoadingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadGamesData() {
    yield takeLatest(LOAD_GAMES, loadGames);
}
