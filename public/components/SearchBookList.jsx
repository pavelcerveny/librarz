import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class SearchBookList extends Component {

    render() {

        const { books } = this.props

        if (books.data.length === 0){
            return(
                <footer>
                    <span>no books</span>
                </footer>
            )
        }

        books.data.map(function(book) {
            if (book.hasOwnProperty('authors')){
                let authors = '';
                if (book.authors.length === 2){
                    book.authors = `${book.authors[0]}, ${book.authors[1]}`;
                }
                else if (book.authors.length > 2){
                    book.authors = `${book.authors[0]}, ${book.authors[1]} ...`;
                }

            }
        });

        return (
            <Table responsive bordered>
                <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Author</th>
                    <th>Location</th>
                    <th>Publish year</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                    {books.data.map(function(book) {

                        return (

                            <tr key={Math.random()}>
                                <td>{book.bookName}</td>
                                <td>{book.authors}</td>
                                <td>{book.location}</td>
                                <td>{book.publishYear}</td>
                                <td>{book.category}</td>
                            </tr>

                        );
                    })}
                </tbody>
            </Table>

        );
    }
}
