export const REQUEST_CATEGORIES_SUCCESSFUL = 'REQUEST_CATEGORIES_SUCCESSFUL'
export const REQUEST_CATEGORIES_ERROR = 'REQUEST_CATEGORIES_ERROR'

function fetchCategoriesSuccessful(categories) {

    return {
        type: REQUEST_CATEGORIES_SUCCESSFUL,
        payload: categories
    }
}

function fetchCategoriesError(error) {

    return {
        type: REQUEST_CATEGORIES_ERROR,
        payload: error
    }
}

export function fetchCategories() {

    return dispatch => {
        return fetch('/api/get/categories')
            .then(response => response.json())
            .then(json => dispatch(fetchCategoriesSuccessful(json)))
            .catch(err => dispatch(fetchCategoriesError(err)))
    }
}
