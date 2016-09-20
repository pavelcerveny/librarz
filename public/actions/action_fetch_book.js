export const FETCH_BOOK_SUCCESSFUL = 'FETCH_BOOK_SUCCESSFUL'
export const FETCH_BOOK_ERROR = 'FETCH_BOOK_ERROR'

export const FETCH_RAND_BOOK_SUCCESSFUL = 'FETCH_RAND_BOOK_SUCCESSFUL'
export const FETCH_RAND_BOOK_ERROR = 'FETCH_RAND_BOOK_ERROR'

export const PAGINATION_SUCCESSFUL = 'PAGINATION_SUCCESSFUL'
export const PAGINATION_ERROR = 'PAGINATION_ERROR'

export const FETCH_BOOK_LOADING = 'FETCH_BOOK_LOADING'

function bookLoading() {

    return {
        type: FETCH_BOOK_LOADING
    }
}

function fetchBookSuccessful(data) {

    return {
        type: FETCH_BOOK_SUCCESSFUL,
        payload: data.book,
        sum: data.sum,
        page: data.page,
        lastSearch: data.lastSearch
    }
}

function fetchBookError(error) {

    return {
        type: FETCH_BOOK_ERROR,
        error
    }
}

export function fetchBook(data) {

    var data = {inputVal: data.searchVal, selectVal: data.category, limit: data.limit}

    return dispatch => {
        dispatch(bookLoading());
        return fetch("/api/get/book",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(fetchBookSuccessful(data))
                }
            })
            .catch(function(err){ dispatch(fetchBookError(err)) })
    }
}

function fetchBookRandSuccessful(data) {

    return {
        type: FETCH_RAND_BOOK_SUCCESSFUL,
        payload: data.docs,
        sum: data.sum,
        page: data.page,
        lastSearch: data.lastSearch
    }
}

function fetchRandBookError(error) {

    return {
        type: FETCH_RAND_BOOK_ERROR,
        error
    }
}

export function fetchRandBook() {

    return dispatch => {

        return fetch(`/api/get/rand/books`)
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(fetchBookRandSuccessful(data))
                }
            })
            .catch(function(err){ dispatch(fetchRandBookError(err)) })
    }
}

/* PAGINATION */
function paginationSuccessful(data) {

    return {
        type: PAGINATION_SUCCESSFUL,
        payload: data.book,
        page: data.page,
        lastSearch: data.lastSearch
    }
}

function paginationError(error) {

    return {
        type: PAGINATION_ERROR,
        error
    }
}

export function paginateBook(data) {

    return dispatch => {
        dispatch(bookLoading());
        return fetch("/api/paginate/book",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(paginationSuccessful(data))
                }
            })
            .catch(function(err){ dispatch(paginationError(err)) })
    }
}