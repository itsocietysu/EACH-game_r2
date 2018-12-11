import {fromJS} from 'immutable';
import {FONT_LOADED} from "./constants";

export const initialState = fromJS({
    fontLoaded: false,
});

function fontReducer(state = initialState, action){
    switch(action.type){
        case FONT_LOADED:
            return state.
                set('fontLoaded', true);
        default:
            return state;
    }
}
export default fontReducer;
