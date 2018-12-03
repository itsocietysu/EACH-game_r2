/* eslint-disable guard-for-in, no-restricted-syntax */
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_AUTH_INFO } from './constants';
import { authInfoLoaded, authInfoLoadingError, loadAuthInfo } from "./actions";
import request from './../../utils/request';

const buildFormData = data => {
  const formArr = [];

  for (const name in data) {
    const val = data[name];
    if (val !== undefined && val !== '') {
      formArr.push(
        [name, '=', encodeURIComponent(val).replace(/%20/g, '+')].join(''),
      );
    }
  }
  return formArr.join('&');
};

/**
 * Auth data load handler
 */
export function* loadUserInfo(Code, App, RedirectUrl) {
  const form = {
    code: Code,
    app: App,
    redirectUrl: RedirectUrl,
  };
  const requestURL = [`http://each.itsociety.su:4201/each/OAuth/token/get`, buildFormData(form)].join('?');

  try {
    const userInfo = yield call(request, requestURL);
    let data = false;
    if (userInfo.length) {
      data = userInfo.map(item => ({
        id: item.id,
        accessToken: item.access_token,
        name: item.name,
        email: item.email,
        image: `${
          item.image[0] ? `http://${item.image[0].url}` : 'assets/images/DefaultPhoto.png'
          }`,
      }));
    }
    yield put(authInfoLoaded(data));
  } catch (err) {
    yield put(authInfoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadUserData() {
  yield takeLatest(LOAD_AUTH_INFO, loadAuthInfo);
}
