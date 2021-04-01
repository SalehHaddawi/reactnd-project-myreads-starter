import React from 'react';
import PropsTypes from "prop-types";
import {Link} from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";

class Search extends React.Component {
    static propTypes = {
        shelves: PropsTypes.array.isRequired,
        onBookShelfChange: PropsTypes.func.isRequired
    }

    state = {
        books: [],
        query: ''
    }

    delay = {
        timer: setTimeout(null, 0),
        time: 400
    }

    searchBooks = (query) => {
        if (query !== '') {
            let queryBooks = [];

            clearTimeout(this.delay.timer);

            this.delay.timer = setTimeout(() => {
                BooksAPI.search(query).then(books =>  {
                    queryBooks = books;

                    // error happened
                    if (!Array.isArray(queryBooks)) {
                        queryBooks = [];
                    }

                    this.setState(() => ({
                        query: query,
                        books: queryBooks
                    }));
                });
            }, this.delay.time);

            return;
        }

        this.setState(() => ({
            query: query,
            books: []
        }));
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={(e) => this.searchBooks(e.target.value.trim())} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book =>
                            <Book key={book.id} book={book} shelves={this.props.shelves} onBookShelfChange={this.props.onBookShelfChange} />
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
