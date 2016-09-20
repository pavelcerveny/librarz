import { browserHistory } from 'react-router';

export const EDIT_BOOK_LOADING = 'EDIT_BOOK_LOADING'

export const EDIT_BOOK_SUCCESSFUL = 'EDIT_BOOK_SUCCESSFUL'
export const EDIT_BOOK_ERROR = 'EDIT_BOOK_ERROR'

export const FETCH_INITIAL_DATA_ERROR = 'FETCH_INITIAL_DATA_ERROR'
export const FETCH_INITIAL_DATA_SUCCESSFUL = 'FETCH_INITIAL_DATA_SUCCESSFUL'

function bookLoading() {

    return {
        type: EDIT_BOOK_LOADING
    }
}

function fetchInitialDataSuccessful(book) {

    return {
        type: FETCH_INITIAL_DATA_SUCCESSFUL,
        payload: book
    }
}

function fetchInitialDataError(error) {

    return {
        type: FETCH_INITIAL_DATA_ERROR,
        payload: error
    }
}

export function fetchInitialData(id) {
    return dispatch => {
        dispatch(bookLoading());
        return fetch(`/api/get/bookId/${id}`)
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(fetchInitialDataSuccessful(data))
                }
            })
            .catch(function(err){ dispatch(fetchInitialDataError(err)) })
    }
}

function editBookSuccessful(book) {

    browserHistory.push('/add-book');

    return {
        type: EDIT_BOOK_SUCCESSFUL,
    }
}

function editBookError(error) {

    return {
        type: EDIT_BOOK_ERROR,
        payload: error
    }
}

export function editBook(bookData) {
    return dispatch => {
        dispatch(bookLoading());
        return fetch("/api/update/book",
            {
                method: "POST",
                body: bookData
            })
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(editBookSuccessful())
                }
            })
            .catch(function(err){ dispatch(editBookError(err)) })
    }
}