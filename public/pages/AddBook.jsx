import React from 'react';
import { Component } from 'react';
import AppContainer from '../containers/AppContainer.jsx';
import Form from '../containers/FormContainer.jsx';
import BookList from '../components/BooksList.jsx';
//import Form from '../components/Form.jsx';
export default class AddBook extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-md-offset-1">
                        <h1>Index</h1>
                        <Form />
                    </div>
                    <div className="col-md-7">
                        <BookList />
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
            </div>
        );
    }
}