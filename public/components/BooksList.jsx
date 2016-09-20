import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeBook } from '../actions/action_add_book';
import { bindActionCreators } from 'redux';
import { Table } from 'react-bootstrap';

class BooksList extends Component {



    render() {

        const { removeBook, books } = this.props

        if (books.data.length === 0){
            return(
                <footer>
                    <span></span>
                </footer>
            )
        }

        books.data.map(function(book) {
            if (book.hasOwnProperty('authors')){
                if (book.authors.length === 2){
                    book.authors = `${book.authors[0]}, ${book.authors[1]}`;
                }
                if (book.authors.length > 2){
                    book.authors = `${book.authors[0]}, ${book.authors[1]} ...`;
                }
            }
        });

        return (
            <Table responsive bordered style={{marginTop:94}}>
                <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Location</th>
                    <th>Publish year</th>
                    <th>Category</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                    {books.data.map(function(book) {

                        return (

                            <tr key={book._id}>
                                <td>{book.bookName}</td>
                                <td>{book.authors}</td>
                                <td>{book.location}</td>
                                <td>{book.publishYear}</td>
                                <td>{book.category}</td>
                                <td><a href={`/edit/${book._id}`}>Edit</a></td>
                                <td><a href="#" onClick={() => removeBook(book._id)}>Remove</a></td>
                            </tr>

                        );
                    })}
                </tbody>
            </Table>

        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.createdBooks,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeBook: (id) => {
            dispatch(removeBook(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);