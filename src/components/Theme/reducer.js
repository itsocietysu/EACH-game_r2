import { fromJS } from 'immutable';
import {
	THEME_CHANGE,
	LIGHT_THEME,
} from './constants';

// TODO: move to constant file
const CONST_THEME_DEFAULT = LIGHT_THEME;

export const initialState = fromJS({
	theme: CONST_THEME_DEFAULT,
});

function themeReducer(state = initialState, action){
switch (action.type) {
  case THEME_CHANGE:
	return state
		.set('theme', action.themeType);
	/* return Object.assign({},state,{'language': action.language});*/
  default:
	return state;
}
}
export default themeReducer;
