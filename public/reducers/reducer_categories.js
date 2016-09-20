
import { REQUEST_CATEGORIES_SUCCESSFUL, REQUEST_CATEGORIES_ERROR } from '../actions/action_categories'

const INITIAL_STATE = { data: [],
                        error: null };

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case REQUEST_CATEGORIES_SUCCESSFUL:
            return { ...state, data: action.payload.categories};
        case REQUEST_CATEGORIES_ERROR:
            return { ...state, data: [...state.data], error: action.payload.error};
        default:
            return state
    }
}

