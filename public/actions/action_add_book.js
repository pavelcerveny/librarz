export const BOOK_LOADING = 'BOOK_LOADING'

export const CREATE_BOOK_SUCCESSFUL = 'CREATE_BOOK_SUCCESSFUL'
export const CREATE_BOOK_ERROR = 'CREATE_BOOK_ERROR'

export const REMOVE_BOOK_ERROR = 'REMOVE_BOOK_ERROR'
export const REMOVE_BOOK_SUCCESSFUL = 'REMOVE_BOOK_SUCCESSFUL'


function bookLoading() {

    return {
        type: BOOK_LOADING
    }
}

function createBookSuccessful(book) {

    return {
        type: CREATE_BOOK_SUCCESSFUL,
        payload: book
    }
}

function createBookError(error) {

    return {
        type: CREATE_BOOK_ERROR,
        payload: error
    }
}

export function createBook(bookData) {
    return dispatch => {
        dispatch(bookLoading());
        return fetch("/api/insert/book",
            {
                method: "POST",
                body: bookData
            })
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(createBookSuccessful(data))
                }
            })
            .catch(function(err){ dispatch(createBookError(err)) })
    }
}

function removeBookSuccessful(id) {

    return {
        type: REMOVE_BOOK_SUCCESSFUL,
        payload: id
    }
}

function removeBookError(id, error) {

    return {
        type: REMOVE_BOOK_ERROR,
        payload: id,
        error : error
    }
}

export function removeBook(id) {
    return dispatch => {
        dispatch(bookLoading());
        return fetch(`/api/delete/book/${id}`)
            .then(function(res){ return res.json(); })
            .then(function(data){

                if (data.success === true) {
                    dispatch(removeBookSuccessful(id))
                }
            })
            .catch(function(err){ dispatch(removeBookError(id, err)) })
    }
}