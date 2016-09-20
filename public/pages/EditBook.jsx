import React from 'react';
import { Component } from 'react';
import EditForm from '../containers/EditFormContainer.jsx';

export default class EditBook extends Component {

    render() {
        const { bookId } = this.props.params

        return (
            <div>
                <div className="row">
                    <div className="col-md-3 col-md-offset-1">
                        <h1>Index</h1>
                        <EditForm id={bookId} />
                    </div>
                </div>
            </div>
        );
    }
}