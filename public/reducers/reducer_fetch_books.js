import { FETCH_BOOK_SUCCESSFUL, FETCH_BOOK_ERROR, FETCH_RAND_BOOK_SUCCESSFUL, FETCH_RAND_BOOK_ERROR, FETCH_BOOK_LOADING, PAGINATION_ERROR, PAGINATION_SUCCESSFUL } from '../actions/action_fetch_book'


const INITIAL_STATE = { data: [],
                        isFetching: false,
                        error: null,
                        sum: 0,
                        limit: 10,
                        page: -1,
                        lastSearch: {}};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_BOOK_LOADING:
            return { ...state, isFetching: true };
        case FETCH_RAND_BOOK_SUCCESSFUL:
        case FETCH_BOOK_SUCCESSFUL:
            return { ...state,
                data: action.payload,
                error: null,
                isFetching: false,
                sum: action.sum,
                page: action.page,
                lastSearch: action.lastSearch};
        case PAGINATION_SUCCESSFUL:
            return { ...state,
                data: action.payload,
                page: action.page};
        case PAGINATION_ERROR:
        case FETCH_RAND_BOOK_ERROR:
        case FETCH_BOOK_ERROR:
            return { ...state, error: action.payload.error, isFetching: false };
        default:
            return state
    }
}
