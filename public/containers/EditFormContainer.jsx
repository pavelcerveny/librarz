import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import SyncValidationForm from '../components/Form.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBook } from '../actions/action_edit_book';

function validate(values) {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter a Title';
    }
    if (!values.categories || values.categories.trim() === '') {
        errors.categories = 'Enter categories';
    }
    if (!values.content || values.content.trim() === '') {
        errors.content = 'Enter some content';
    }

    return errors;
}

class EditFormContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SyncValidationForm {...this.props}/>
            </div>

        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ handleForm: editBook }, dispatch);
}


export default connect(null, mapDispatchToProps)(EditFormContainer);