import { fromJS } from 'immutable';
import {
	IMAGE_COMPARE, IMAGE_COMPARE_SUCCESS, IMAGE_COMPARE_ERROR
} from '../constants/imageValidationConstants';

export const initialState = fromJS({
	loading: false,
	error: false,
	result: -1,
});

function imageComparisonReducer(state = initialState, action){
	switch (action.type) {
        case IMAGE_COMPARE:
            return state
                .set('loading', true)
                .set('error', false)
                .set('result', -1);
        case IMAGE_COMPARE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('result', action.result);
        case IMAGE_COMPARE_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('result', -1);
        default:
            return state;
	}
}
export default imageComparisonReducer;
