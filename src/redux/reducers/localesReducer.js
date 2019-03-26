import { fromJS } from 'immutable';
import {
	LANGUAGE_CHANGE,
} from '../constants/localesConstants';

// TODO: move to constant file
const CONST_LANGUAGE_DEFAULT = 'en';

export const initialState = fromJS({
	language: CONST_LANGUAGE_DEFAULT,
});

function languageReducer(state = initialState, action){
switch (action.type) {
  case LANGUAGE_CHANGE:
	return state
		.set('language', action.language);
	/* return Object.assign({},state,{'language': action.language});*/
  default:
	return state;
}
}
export default languageReducer;
