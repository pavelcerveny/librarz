import { UPDATE_BOOK_DATA_ERROR, UPDATE_BOOK_DATA_SUCCESSFUL } from '../actions/dataTableActions';

const INITIAL_STATE = {
  data: [],
  error: null
};

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
    case UPDATE_BOOK_DATA_ERROR:
      return { ...state, data: action.payload.categories};
    case UPDATE_BOOK_DATA_SUCCESSFUL:
      return { ...state, data: [...state.data], error: action.payload.error};
    default:
      return state
  }
}