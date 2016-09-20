import React from 'react';
import { Component } from 'react';
//import SearchBook from '../components/SearchBook.jsx';
//import SearchBookList from '../components/SearchBookList.jsx'

import SearchBook from '../containers/SearchBookContainer.jsx'

export default class Index extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <h1>Search some book</h1>
                        <br />
                        <SearchBook />
                    </div>
                </div>

            </div>
        );
    }
}