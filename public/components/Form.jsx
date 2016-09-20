import React, {Component} from 'react';
import { Field, FieldArray, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/action_categories';
import { createBook } from '../actions/action_add_book';
import { fetchInitialData } from '../actions/action_edit_book';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

/*TODO: add validation*/

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const renderAuthors = ({fields}) => (
    <ul className="list-group">
        <li className="list-group-item"><button className="btn btn-primary" type="button" onClick={() => fields.push()}>Add author</button></li>
        {fields.map((field, index) =>
            <li key={index} className="list-group-item">
                <Field name={field} component={renderField} label={`Author: #${index+1}`}/>
                <br /><br />
                <button className="btn btn-success" type="button" onClick={() => fields.remove(index)}>Remove</button>
            </li>
        )}
    </ul>
)


class SyncValidationForm extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount () {

        if (_.isEmpty(this.props.categories.data))
            this.props.dispatch(fetchCategories());

        if (this.props.id) {
            this.props.dispatch(fetchInitialData(this.props.id));
        }
    }

    submitMyForm(values){

        var formData  = new FormData();

        for(name in values) {

            if (name === 'frontPagePic'){
                let val = values.frontPagePic[0];
                formData.append(name, val);
            }
            else
                formData.append(name, values[name]);

        }

        if (this.props.id) {
            formData.append('_id', this.props.id);
        }
        this.props.handleForm(formData);
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props

        var loading = ''
        if (this.props.isFetchingCreate){
            loading = <h1>Inserting....</h1>
        }
        if (this.props.isFetchingEdit){
            loading = <h1>Loading data....</h1>
        }


        if (this.props.resetForm && document.getElementById('file')){
            document.getElementById('file').value = null;
        }

        return (

            <form onSubmit={handleSubmit(this.submitMyForm.bind(this))} className="input-group">
                {loading}

                <Field name="bookName" component={renderField} label="Book Name"/>
                <Field name="location" type="text" component={renderField} label="Location"/>
                <Field name="publishYear" type="number" component={renderField} label="Publishing Year"/>
                <Field name="noPages" type="number" component={renderField} label="No. Pages"/>
                <br /><br /><br />
                <FieldArray name="authors" component={renderAuthors}/>
                <div>
                    <label>Category</label>
                    <div>
                        <Field className="form-control" name="category" component="select">
                            {this.props.categories.data.map(option =>
                                <option value={option} key={option}>
                                    {option}
                                </option>)}
                        </Field>
                    </div>
                </div>
                <div>
                    <label>Image</label>
                    <div>
                        <Field className="form-control" id="file" key="frontPic" name="frontPagePic" type="file" component="input"/>
                    </div>
                </div>
                <br /><br /><br />
                <div>
                    <button className="btn btn-primary" style={{marginRight: 20}} type="submit" disabled={submitting}>Submit</button>
                    <button className="btn btn-warning" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state, ownProps) {

    var initial = {}
    const { data } = state.editBooks

    if(ownProps.id && !_.isEmpty(data)) {
        initial = data
    }

    return {
        categories: state.categories,
        books: state.createdBooks,
        isFetchingCreate: state.createdBooks.isFetching,
        isFetchingEdit: state.editBooks.isFetching,
        resetForm: state.createdBooks.resetForm,
        initialValues: initial,
    };
}
/*
 Pass a enableReinitialize prop or reduxForm() config parameter set to true to allow the form the reinitialize with new
 "pristine" values every time the initialValues prop changes. To keep dirty form values when it reinitializes, you can
 set keepDirtyOnReinitialize to true. By default, reinitializing the form replaces all dirty values with "pristine" values.
 */
export default connect(mapStateToProps, null)(reduxForm({
    form: 'syncValidation',
    enableReinitialize: true,
    fields: ['bookName', 'location', 'yearPublish', 'pagesNumber', 'authors', 'category', 'frontPagePic' ],
})(SyncValidationForm));
