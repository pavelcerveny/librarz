import React, { Component } from 'react';

import SearchBookList from '../components/SearchBookList.jsx';
import SearchBook from '../components/SearchBook.jsx';
import Pagination from '../components/Pagination.jsx';
import { connect } from 'react-redux';

import { fetchBook, paginateBook } from '../actions/action_fetch_book';
import { bindActionCreators } from 'redux';


class SearchBookContainer extends Component {

    render() {

        return (
            <div>
                <div className="row">
                    <SearchBook handle={this.props.handleSubmit}/>
                </div>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-md-12">
                        <SearchBookList books={this.props.books} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Pagination activePage={this.props.page} sum={this.props.sum} paginate={this.props.handlePaginate} limit={this.props.limit}/>
                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        page: state.fetchedBooks.page,
        books: state.fetchedBooks,
        sum: state.fetchedBooks.sum,
        limit: state.fetchedBooks.limit
    };
}

function searchAction(searchBookInputObj) {
    return (dispatch, getState) => {
        let { limit } = getState().fetchedBooks;
        searchBookInputObj.limit = limit;

        dispatch(fetchBook(searchBookInputObj));
    }
}

function paginateAction(page) {
    return (dispatch, getState) => {
        let { limit, lastSearch } = getState().fetchedBooks;
        let data = {limit, lastSearch, page}

        dispatch(paginateBook(data));
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit : (searchVal) => {
            dispatch(searchAction(searchVal))
        },
        handlePaginate : (pageVal) => {
            dispatch(paginateAction(pageVal))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBookContainer);