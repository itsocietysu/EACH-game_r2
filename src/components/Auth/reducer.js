import { fromJS } from 'immutable';
import {
    AUTH_CHANGE,
} from './constants';

// TODO: move to constant file
const CONST_AUTH_DEFAULT = false;

export const initialState = fromJS({
    auth: CONST_AUTH_DEFAULT,
});

function authReducer(state = initialState, action){
    switch (action.type) {
        case AUTH_CHANGE:
            return state
              .set('auth', action.auth);
      /* return Object.assign({},state,{'language': action.language});*/
        default:
            return state;
    }
}
export default authReducer;
