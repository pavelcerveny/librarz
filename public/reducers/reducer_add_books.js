import { CREATE_BOOK_SUCCESSFUL, CREATE_BOOK_ERROR, BOOK_LOADING, REMOVE_BOOK_SUCCESSFUL, REMOVE_BOOK_ERROR } from '../actions/action_add_book'
import _ from 'lodash';

const INITIAL_STATE = { data: [],
                        isFetching: false,
                        resetForm: false,
                        error: null};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case BOOK_LOADING:
            return { ...state, data: [...state.data], error: null, isFetching: true, resetForm: false };
        case CREATE_BOOK_SUCCESSFUL:
            return { ...state,
                    data: [
                        ...state.data,
                        action.payload.book
                    ],
                    error: null,
                    isFetching: false,
                    resetForm: true};
        case CREATE_BOOK_ERROR:
            return { ...state, data:[...state.data], error: action.payload.error, isFetching: false, resetForm: false };
        case REMOVE_BOOK_SUCCESSFUL:
            return { ...state,
                data:
                    _.remove(state.data, {
                        _id: action.payload.id
                    })
                ,
                error: null,
                isFetching: false,
                resetForm: false};
        case REMOVE_BOOK_ERROR:
            return { ...state, data:[...state.data], error: action.payload.error, isFetching: false, resetForm: false };
        default:
            return state
    }
}
