import { FETCH_INITIAL_DATA_ERROR, FETCH_INITIAL_DATA_SUCCESSFUL, EDIT_BOOK_LOADING, EDIT_BOOK_SUCCESSFUL, EDIT_BOOK_ERROR } from '../actions/action_edit_book'
import _ from 'lodash';

const INITIAL_STATE = { data: {},
                        isFetching: false,
                        error: null};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case EDIT_BOOK_LOADING:
            return { ...state, isFetching: true };
        case FETCH_INITIAL_DATA_SUCCESSFUL:
            return { ...state,
                data: action.payload.book,
                isFetching: false};
        case EDIT_BOOK_SUCCESSFUL:
            return { ...state, data: {}, isFetching: false };
        case FETCH_INITIAL_DATA_ERROR:
        case EDIT_BOOK_ERROR:
            return { ...state, error: action.payload.error, isFetching: false };
        default:
            return state
    }
}