import {fromJS} from "immutable/dist/immutable";
import {LOAD_USER_DATA} from "../constants/userDataConstants";

export const initialState = fromJS({
    data: false,
});

function userDataReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_DATA:
            return state
                .set('data', action.userData);
        default:
            return state;
    }
}

export default userDataReducer;
