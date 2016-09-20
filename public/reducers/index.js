import { CREATE_BOOK_SUCCESSFUL } from '../actions/action_add_book'

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categoriesReducer from './reducer_categories';
import addBooksReducer from './reducer_add_books';
import fetchBooksReducer from './reducer_fetch_books';
import editBooksReducers from './reducer_edit_book';

const rootReducer = combineReducers({
    //form: formReducer, // <-- redux-form
    form: formReducer.plugin({
        syncValidation: (state, action) => { // <------ 'syncValidation' is name of form given to reduxForm()
            switch(action.type) {
                case CREATE_BOOK_SUCCESSFUL:
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        }
    }),
    categories: categoriesReducer,
    createdBooks: addBooksReducer,
    fetchedBooks: fetchBooksReducer,
    editBooks: editBooksReducers

});

export default rootReducer;