import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_MUSEUMS} from '../constants/museumConstants';
import { museumsLoaded, museumsLoadingError } from '../actions/museumActions';
import request from '../../utils/request';

/**
 * Feeds data load handler
 */
export function* loadMuseums() {
    const requestURL = `http://each.itsociety.su:4201/each/museum/all`;
    try {
        const museums = yield call(request, requestURL);
        let data = false;
        if (museums.length) {
            data = museums.map(item => ({
                eid: item.eid,
                name: item.name,
                desc: item.desc,
                location: item.location,
                game: item.game,
                image: `${
                    item.image[0] ? `http://${item.image[0].url}` : 'assets/images/DefaultPhoto.png'
                    }`,
                logo: `${
                    item.logo[0] ? `http://${item.logo[0].url}` : 'assets/images/DefaultPhoto.png'
                    }`

                // priority: `${item.priority[0] ? item.priority[0] : 0}`,
            }));
        }
        yield put(museumsLoaded(data));
    } catch (err) {
        yield put(museumsLoadingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadMuseumsData() {
    yield takeLatest(LOAD_MUSEUMS, loadMuseums);
}
