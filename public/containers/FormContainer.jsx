import { reduxForm } from 'redux-form';
import SyncValidationForm from '../components/Form.jsx';
import { connect } from 'react-redux';
import { createBook } from '../actions/action_add_book';
import { bindActionCreators } from 'redux';

/*function mapStateToProps(state) {
    return {
        categories: state.categories,
        books: state.createdBooks,
        isFetching: state.createdBooks.isFetching,
        resetForm: state.createdBooks.resetForm
    };
}*/

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleForm: createBook }, dispatch);
}


export default connect(null, mapDispatchToProps)(SyncValidationForm);